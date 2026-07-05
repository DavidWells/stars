---
repo: Open-Attestation/oa-verify
url: 'https://github.com/Open-Attestation/oa-verify'
homepage: ''
starredAt: '2025-01-29T22:23:13Z'
createdAt: '2019-04-01T08:50:22Z'
updatedAt: '2025-02-06T18:53:44Z'
language: TypeScript
license: Apache-2.0
branch: master
stars: 6
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:09.297Z'
description: Verification library for OpenAttestation document
tags:
  - hacktoberfest
---

# OpenAttestation (Verify)

Using the [OpenAttestation (Verify)](https://github.com/Open-Attestation/oa-verify) repository as the codebase for the `npm` module, you can verify [wrapped documents](https://www.openattestation.com/docs/lib-section/remote-files/open-attestation#wrapping-documents) programmatically. This is useful if you are building your own API or web components. The following are common use cases where you will need this module:

- [Verifying a document](#verifying-a-document)
- [Building a custom verifier](#custom-verification)
- [Adding custom validation](#custom-validation)

This module does not provide the following functionalities:

- Programmatic wrapping of OA documents (refer to [OpenAttestation](https://www.openattestation.com/docs/lib-section/remote-files/open-attestation#wrapping-documents))
- Encryption or decryption of OA documents (refer to [OpenAttestation (Encryption)](https://www.openattestation.com/docs/lib-section/remote-files/open-attestation-encryption))
- Programmatic issuance or revocation of any document on the Ethereum blockchain

## Verification flow

In brief, the verification flow runs three checks on the document:

1. The document integrity check
1. The issuance status check
1. The issuance identity check

Only when it passes all three checks, will it count as a valid OA document.

### Ethereum

The diagram below shows the verification flow on OA documents issued using the Ethereum method:

![Verify OA documents issued using Ethereum](https://raw.githubusercontent.com/Open-Attestation/oa-verify/master/diagram/verifiable-docs-eth.light.svg)

### DID

The diagram below shows the verification flow on OA documents issued using the DID method:

![Verify OA documents issued using DID](https://raw.githubusercontent.com/Open-Attestation/oa-verify/master/diagram/verifiable-docs-did.light.svg)

## Installation

To install OpenAttestation (Verify) on your machine, run the command below:

```bash
npm i @govtechsg/oa-verify
```

## Usage

### Verifying a document

A verification happens on a wrapped document, which performs the following checks:

- Has the document been tampered with?
- Is the issuance state of the document valid?
- Is the document issuer identity valid? (See [identity proof](https://www.openattestation.com/docs/verify-section/issuance-identity))

The verification requires a wrapped document created using [OpenAttestation](https://www.openattestation.com/docs/lib-section/remote-files/open-attestation). The following shows an example of a wrapped document, which is valid and has been issued on the Sepolia network.

```json
{
  "version": "https://schema.openattestation.com/2.0/schema.json",
  "data": {
    "billFrom": {},
    "billTo": { "company": {} },
    "$template": {
      "type": "f76f4d39-8d23-455b-96ba-5889e0233641:string:EMBEDDED_RENDERER",
      "name": "575f0624-7f43-484c-9285-edd1ae96ebc6:string:INVOICE",
      "url": "fb61f072-64e9-4c2f-83bf-ae68fd911414:string:https://generic-templates.tradetrust.io"
    },
    "issuers": [
      {
        "name": "ed121e9e-8f70-4a01-a422-4509d837c13f:string:Demo Issuer",
        "documentStore": "08948d61-9392-459f-b476-e3c51961f04b:string:0x49b2969bF0E4aa822023a9eA2293b24E4518C1DD",
        "identityProof": {
          "type": "61c13b84-181a-43aa-85f5-dfe89e4b6963:string:DNS-TXT",
          "location": "d7ba5e33-cf5f-4fcc-a4b7-3e6e17324966:string:demo-tradetrust.openattestation.com"
        },
        "revocation": {
          "type": "23d47c6b-4384-4c31-90ca-8284602f6b3e:string:NONE"
        }
      }
    ],
    "links": {
      "self": {
        "href": "121c55c0-864d-4e54-a1f0-86bec4b9a050:string:https://action.openattestation.com?q=%7B%22type%22%3A%22DOCUMENT%22%2C%22payload%22%3A%7B%22uri%22%3A%22https%3A%2F%2Ftradetrust-functions.netlify.app%2F.netlify%2Ffunctions%2Fstorage%2Faea9cb1a-816a-4fd7-b3a9-84924dc9a9e9%22%2C%22key%22%3A%22d80b453e53bb26d3b36efe65f18f0482f52d97cffad6f6c9c195d10e165b9a83%22%2C%22permittedActions%22%3A%5B%22STORE%22%5D%2C%22redirect%22%3A%22https%3A%2F%2Fdev.tradetrust.io%2F%22%2C%22chainId%22%3A%225%22%7D%7D"
      }
    },
    "network": {
      "chain": "05eb1707-5426-41d8-8fde-bc48ff0f2182:string:ETH",
      "chainId": "ae505425-2df7-4597-87d2-037418d7bcbf:string:5"
    }
  },
  "signature": {
    "type": "SHA3MerkleProof",
    "targetHash": "f292056ed5e5535400cec63b78a84ec384d2d77117e1606a17644e7b97a03cac",
    "proof": [],
    "merkleRoot": "f292056ed5e5535400cec63b78a84ec384d2d77117e1606a17644e7b97a03cac"
  }
}
```

To perform the verification checks on the document, use the following code:

```ts
// index.ts
import { isValid, verify } from "@govtechsg/oa-verify";
import * as document from "./document.json";

const fragments = await verify(document as any);

console.log(isValid(fragments)); // output true
```

### Custom verification

By default, the provided `verify` method performs multiple checks on a document.

- The type `DOCUMENT_STATUS` runs these verifiers:

  - `OpenAttestationEthereumDocumentStoreStatus`
  - `OpenAttestationEthereumTokenRegistryStatus`
  - `DidSignedDocumentStatus`

- The type `DOCUMENT_INTEGRITY` runs this verifier:

  - `OpenAttestationHash`

- The type `ISSUER_IDENTITY` runs these verifiers:
  - `OpenAttestationDnsTxt`
  - `DnsDidProof`

All those verifiers are exported as `openAttestationVerifiers`

You can build your own verification method based on the default exported verifiers:

```ts
// creating your own verification method using default exported verifiers
import { verificationBuilder, openAttestationVerifiers } from "@govtechsg/oa-verify";

const verify1 = verificationBuilder(openAttestationVerifiers, { network: "sepolia" }); // this verification is equivalent to the one exported by the library

const verify2 = verificationBuilder([openAttestationVerifiers[0], openAttestationVerifiers[1]], {
  network: "sepolia",
}); // this verification only runs 2 verifiers
```

You can also build your own verification method based on the custom verifiers:

```ts
// creating your own verification using custom verifier
import { verificationBuilder, openAttestationVerifiers, Verifier } from "@govtechsg/oa-verify";
const customVerifier: Verifier<any> = {
  skip: () => {
    // returns a SkippedVerificationFragment if the verifier should be skipped or throws an error if it should always run
  },
  test: () => {
    // returns true or false
  },
  verify: async (document) => {
    // performs checks and returns a fragment
  },
};

// creates your own verify function with all verifiers and your custom one
const verify = verificationBuilder([...openAttestationVerifiers, customVerifier], { network: "sepolia" });
```

Refer to the [Extending custom verification](#extending-custom-verification) section to find out more on how to create your own custom verifier.

### Custom validation

Fragments will be produced after verifying a document. Each fragment will determine if the individual type mentioned [here](#custom-verification) is valid or not, and will collectively prove the validity of the document.

The `isValid` function will execute over fragments and determine if the fragments produced a valid result. By default, the function will return `true` if a document fulfils all the following conditions:

- The document has NOT been tampered.
- AND The document has been issued.
- AND The document has NOT been revoked.
- AND The issuer identity is valid.

In the function, a list of types also checks for as a second parameter.

```ts
// index.ts
import { isValid, openAttestationVerifiers, verificationBuilder } from "@govtechsg/oa-verify";
import * as document from "./document.json";

const verify = verificationBuilder(openAttestationVerifiers, {
  network: "mainnet",
});

const fragments = await verify(document as any);

console.log(isValid(fragments, ["DOCUMENT_INTEGRITY"])); // output true
console.log(isValid(fragments, ["DOCUMENT_STATUS"])); // output false
console.log(isValid(fragments, ["ISSUER_IDENTITY"])); // output false
console.log(isValid(fragments)); // output false
```

The following explains what the functions return with reasons:

- `isValid(fragments, ["DOCUMENT_INTEGRITY"])` returns `true` because the integrity of the document is not dependent on the network where it has been published.
- `isValid(fragments, ["DOCUMENT_STATUS"])` returns `false` because the document has not been published on the Ethereum main network.
- `isValid(fragments, ["ISSUER_IDENTITY"])` returns `false` because there is no [DNS TXT record](https://www.openattestation.com/docs/ethereum-section/dns-proof) associated with the Ethereum main network's document store.
- `isValid(fragments)` returns `false` because at least one of the above returns false.

### Listening to an individual verification method

The `verify` function provides an option that listens to individual verification methods. It can be useful if you want, for instance, to provide individual loaders on your UI.

The following is a code example with that option:

```ts
// index.ts
import { isValid, openAttestationVerifiers, verificationBuilder } from "@govtechsg/oa-verify";
import * as document from "./document.json";

const verify = verificationBuilder(openAttestationVerifiers, {
  network: "sepolia",
});

const promisesCallback = (verificationMethods: any) => {
  for (const verificationMethod of verificationMethods) {
    verificationMethod.then((fragment: any) => {
      console.log(`${fragment.name} has been resolved with status ${fragment.status}`);
    });
  }
};

const fragments = await verify(document as any, promisesCallBack);

console.log(isValid(fragments)); // output true
```

---

## Advanced usage

### Extending custom verification

Extending from the [Custom verification](#custom-verification) section, you will learn how to write custom verification methods and how to distribute your own verifier.

#### Building a custom verification method

You will write a verification method with the following rules:

1. It must run only on documents with their version equal to `https://schema.openattestation.com/2.0/schema.json`

1. It must return a valid fragment, only if the document data hold a `name` property with the value `Certificate of Completion`

##### Document version

This is where `skip` and `test` methods are needed. You will use the `test` method to return when the verification method was running and the `skip` method to explain why it wasn't:

```ts
// index.ts
import { verificationBuilder, openAttestationVerifiers, Verifier, isValid } from "@govtechsg/oa-verify";
import { getData } from "@govtechsg/open-attestation";
import * as document from "./document.json";

const customVerifier: Verifier<any> = {
  skip: async () => {
    return {
      status: "SKIPPED",
      type: "DOCUMENT_INTEGRITY",
      name: "CustomVerifier",
      reason: {
        code: 0,
        codeString: "SKIPPED",
        message: `Document doesn't have version equal to 'https://schema.openattestation.com/2.0/schema.json'`,
      },
    };
  },
  test: () => document.version === "https://schema.openattestation.com/2.0/schema.json",
};
```

> **Note:** Use the `DOCUMENT_INTEGRITY` type to check the document content.

##### The `name` property

Once you have decided `when` the verification method will run, you need to write the logic of the verifier in the `verify` method. You will use the [getData](https://www.openattestation.com/docs/lib-section/remote-files/open-attestation#retrieving-the-document-data) utility to access the document data and return the appropriate fragment depending on the content:

```ts
// index.ts
import { verificationBuilder, openAttestationVerifiers, Verifier, isValid } from "@govtechsg/oa-verify";
import { getData } from "@govtechsg/open-attestation";
import * as document from "./document.json";

const customVerifier: Verifier<any> = {
  skip: async () => {
    /* content has been defined in the section above */
  },
  test: () => /* content has been defined in the section above */,
  verify: async (document: any) => {
    const documentData = getData(document);
    if (documentData.name !== "Certificate of Completion") {
      return {
        type: "DOCUMENT_INTEGRITY",
        name: "CustomVerifier",
        data: documentData.name,
        reason: {
          code: 1,
          codeString: "INVALID_NAME",
          message: `Document name is ${documentData.name}`,
        },
        status: "INVALID",
      };
    }
    return {
      type: "DOCUMENT_INTEGRITY",
      name: "CustomVerifier",
      data: documentData.name,
      status: "VALID",
    };
  },
};
```

#### Building a custom verify method

The `verify` function is built to run a list of verification methods. Each verifier will produce a fragment that determines if the document is valid. OpenAttestation has its own set of verification methods in `openAttestationVerifiers`.

Using the `verificationBuilder` function, you can create custom verification methods and reuse the default method exported from the library.

Extending from the [Custom verification](#custom-verification) section, you will build a new verifier using the custom verification method below:

```ts
// index.ts
import { verificationBuilder, openAttestationVerifiers, Verifier, isValid } from "@govtechsg/oa-verify";
import { getData } from "@govtechsg/open-attestation";
import document from "./document.json";

// based on the test condition specified below, your custom verifier will only check documentData.name if document.version is equal to https://schema.openattestation.com/2.0/schema.json
const customVerifier: Verifier<any> = {
  skip: async () => {
    return {
      status: "SKIPPED",
      type: "DOCUMENT_INTEGRITY",
      name: "CustomVerifier",
      reason: {
        code: 0,
        codeString: "SKIPPED",
        message: `Document doesn't have version equal to 'https://schema.openattestation.com/2.0/schema.json'`,
      },
    };
  },
  test: () => document.version === "https://schema.openattestation.com/2.0/schema.json",
  verify: async (document: any) => {
    const documentData = getData(document);
    if (documentData.name !== "Certificate of Completion") {
      return {
        type: "DOCUMENT_INTEGRITY",
        name: "CustomVerifier",
        data: documentData.name,
        reason: {
          code: 1,
          codeString: "INVALID_NAME",
          message: `Document name is ${documentData.name}`,
        },
        status: "INVALID",
      };
    }
    return {
      type: "DOCUMENT_INTEGRITY",
      name: "CustomVerifier",
      data: documentData.name,
      status: "VALID",
    };
  },
};

// create your own verify function with all verifiers and your custom one
const verify = verificationBuilder([...openAttestationVerifiers, customVerifier], { network: "sepolia" });

const fragments = await verify(document);

console.log(isValid(fragments)); // return false
console.log(fragments.find((fragment: any) => fragment.name === "CustomVerifier")); // display the details on our specific verifier
```

The document you [created](#verifying-a-document) is not valid according to your own verifier, because the `name` property does not exist. Test again with the following document:

```json
{
  "version": "https://schema.openattestation.com/2.0/schema.json",
  "data": {
    "name": "66e35a92-9e97-4ffc-b94e-769773dd7535:string:Certificate of Completion",
    "issuers": [
      {
        "documentStore": "375a13f9-ca3d-4a1f-a0c9-1fa92e43a3ec:string:0x8Fc57204c35fb9317D91285eF52D6b892EC08cD3",
        "name": "448c7f62-3a93-4792-a157-fabcbf15b91a:string:University of Blockchain",
        "identityProof": {
          "type": "dcfc17e0-a178-4bb8-b0fb-6a2cfddb8f2f:string:DNS-TXT",
          "location": "e3f54dbf-bb51-41bb-9511-e01a5c07ea86:string:example.openattestation.com"
        }
      }
    ]
  },
  "privacy": { "obfuscatedData": [] },
  "signature": {
    "type": "SHA3MerkleProof",
    "targetHash": "975887a864e11fbe27e90f4759c44db90193abc237dede81cd3cd7ca45c46522",
    "proof": [],
    "merkleRoot": "975887a864e11fbe27e90f4759c44db90193abc237dede81cd3cd7ca45c46522"
  }
}
```

### Environment variables

- `PROVIDER_API_KEY`: You can provide your own PROVIDER API key.
- `PROVIDER_ENDPOINT_URL`: You can provide your preferred JSON-RPC HTTP API URL.
- `PROVIDER_NETWORK`: You can specify the network to use, i.e. "homestead", "mainnet", or "sepolia".
- `PROVIDER_ENDPOINT_TYPE`: You can specify the provider to use, i.e. "infura", "alchemy", or "jsonrpc".

  - Supported providers include:
    - Infura
    - EtherScan
    - Alchemy
    - JSON-RPC

### Switching network

You may build the verifier to check against a custom network with either way:

1. Providing your own Web3 provider

2. Specifying the network name

   In this way, the provider will be using the default one.

#### Provider

The following code example shows how you can specify a custom provider:

```ts
const verify = verificationBuilder(openAttestationVerifiers, { provider: customProvider });
```

#### Network

The following code example shows how you can specify the network:

```ts
const verify = verificationBuilder(openAttestationVerifiers, { network: "sepolia" });
```

### Specifying the resolver

Using the exposed `createResolver` method, you can easily create custom resolvers to resolve DIDs:

```ts
import { createResolver, verificationBuilder, openAttestationVerifiers } from "@govtechsg/oa-verify";

const resolver = createResolver({
  networks: [{ name: "my-network", rpcUrl: "https://my-private-chain/besu", registry: "0xaE5a9b9..." }],
});

const verify = verificationBuilder(openAttestationVerifiers, { resolver });
```

At the moment, `oa-verify` supports two DID resolvers:

- [web-did-resolver](https://github.com/decentralized-identity/web-did-resolver#readme)
- [ethr-did-resolver](https://github.com/decentralized-identity/ethr-did-resolver)

---

## Provider

You can generate a provider using the provider generator, which supports these providers:

- `INFURA`
- `ALCHEMY`
- `ETHERSCAN`
- `JsonRPC`

It requires a set of options:

- `network`: Specified as a **string** for a common network name, i.e. "homestead", "mainnet", or "sepolia"
- `provider`: Specified as a **string**, i.e. "infura", "alchemy", or "jsonrpc"
- `url`: Specified as a **string**, which is being used to connect to a JSON-RPC HTTP API
- `apiKey`: Specified as a **string** to be used together with the provider. If no value is provided, a default shared API key will be used, which may result in reduced performance and throttled requests.

### Example

The following shows a basic use case of `provider`:

```ts
import { utils } from "@govtechsg/oa-verify";
const provider = utils.generateProvider();
// This will generate an infura provider using the default values.
```

#### Alternate method 1

This method uses the environment variables:

```ts
// environment file
PROVIDER_NETWORK = "sepolia";
PROVIDER_ENDPOINT_TYPE = "infura";
PROVIDER_ENDPOINT_URL = "http://jsonrpc.com";
PROVIDER_API_KEY = "ajdh1j23";

// provider file
import { utils } from "@govtechsg/oa-verify";
const provider = utils.generateProvider();
// This will use the environment variables declared in the files automatically.
```

#### Alternate method 2

This method passes in the values as parameters:

```ts
import { utils } from "@govtechsg/oa-verify";
const providerOptions = {
  network: "sepolia",
  providerType: "infura",
  apiKey: "abdfddsfe23232",
};
const provider = utils.generateProvider(providerOptions);
// This will generate a provider based on the options provided.
// Note: Using this declaration will override all environment variables and default values.
```

---

## Utils and types

### Overview

Various utilities and types are available to assert the correctness of fragments. Each verification method exports types for the fragment and the data associated with the fragment.

- Fragment types are available in four flavors: `VALID`, `INVALID`, `SKIPPED`, and `ERROR`.
- `VALID` and `INVALID` fragment data are available in two flavors most of the time, one for each version of `OpenAttestation` (V2 or V3).

This library provides types and utilities to:

- Get a specific fragment from all fragments returned by the `verify` method.
- Narrow down to a specific type of fragment.
- Narrow down to specific data from the fragment.

### Example

The following code example shows the usage:

```ts
import { utils } from "@govtechsg/oa-verify";
const fragments = verify(documentValidWithCertificateStore, { network: "sepolia" });
// return the correct fragment, correctly typed
const fragment = utils.getOpenAttestationEthereumTokenRegistryStatusFragment(fragments);

if (utils.isValidFragment(fragment)) {
  // guard to narrow to the valid fragment type
  const { data } = fragment;
  if (ValidTokenRegistryDataV2.guard(data)) {
    // data is correctly typed here
  }
}
```

> **Note:** In the example above, it may be unnecessary to use `utils.isValidFragment`, as it's possible to use `ValidTokenRegistryDataV2.guard` directly over the data.

### List of utilities

- `getOpenAttestationHashFragment`
- `getOpenAttestationDidSignedDocumentStatusFragment`
- `getOpenAttestationEthereumDocumentStoreStatusFragment`
- `getOpenAttestationEthereumTokenRegistryStatusFragment`
- `getOpenAttestationDidIdentityProofFragment`
- `getOpenAttestationDnsDidIdentityProofFragment`
- `getOpenAttestationDnsTxtIdentityProofFragment`
- `getDocumentIntegrityFragments`
- `getDocumentStatusFragments`
- `getIssuerIdentityFragments`
- `isValidFragment`: Type guard to filter only the `VALID` fragment type
- `isInvalidFragment`: Type guard to filter only the `INVALID` fragment type
- `isErrorFragment`: Type guard to filter only the `ERROR` fragment type
- `isSkippedFragment`: Type guard to filter only the `SKIPPED` fragment type

---

## Verification method

| Name                                       | Type               | Description                                                                  | Present in default verifier? |
| ------------------------------------------ | ------------------ | ---------------------------------------------------------------------------- | ---------------------------- |
| OpenAttestationHash                        | DOCUMENT_INTEGRITY | Verify that merkle root and target hash matches the certificate              | Yes                          |
| OpenAttestationDidSignedDocumentStatus     | DOCUMENT_STATUS    | Verify the validity of the signature of a DID signed certificate             | Yes                          |
| OpenAttestationEthereumDocumentStoreStatus | DOCUMENT_STATUS    | Verify the certificate has been issued to the document store and not revoked | Yes                          |
| OpenAttestationEthereumTokenRegistryStatus | DOCUMENT_STATUS    | Verify the certificate has been issued to the token registry and not revoked | Yes                          |
| OpenAttestationDidIdentityProof            | ISSUER_IDENTITY    | Verify identity of DID (similar to OpenAttestationDidSignedDocumentStatus)   | No                           |
| OpenAttestationDnsDidIdentityProof         | ISSUER_IDENTITY    | Verify identify of DID certificate using DNS-TXT                             | Yes                          |
| OpenAttestationDnsTxtIdentityProof         | ISSUER_IDENTITY    | Verify identify of document store certificate using DNS-TXT                  | Yes                          |

---

## Development

To run tests, use the following command:

```
npm run test
```

To generate test documents (for V3), use the script at `scripts/generate.v3.ts` and run the following command:

```
npm run generate:v3
```

## License

OpenAttestation (Verify) is under the [Apache license, version 2.0](https://www.apache.org/licenses/LICENSE-2.0).

## Additional information

- For more information on the verification SDK implementation, follow the [Verifier ADR](https://github.com/Open-Attestation/adr/blob/master/verifier.md).
- If you find a bug, have a question, or want to share an idea, reach us at our [Github repository](https://github.com/Open-Attestation/oa-verify).
