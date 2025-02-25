---
repo: andrei-demidov/aws-iac-cdn-multi-region-poc
url: 'https://github.com/andrei-demidov/aws-iac-cdn-multi-region-poc'
homepage: ''
starredAt: '2025-01-08T23:46:00Z'
createdAt: '2024-12-04T08:32:40Z'
updatedAt: '2025-01-31T11:59:33Z'
language: null
license: MIT
branch: main
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:18.905Z'
description: Multi-region CDN architecture with CloudFront Functions
tags:
  - cdn
  - cloudformation
  - cloudfront
  - cloudfront-functions
  - content-delivery
  - content-delivery-network
  - iac
  - javascript
  - multi-region
  - multi-region-architecture
  - s3
---

# IaC CDN Multi-Region PoC for AWS

This project demonstrates a multi-region **Content Delivery Network (CDN)** architecture using **AWS CloudFormation**. It showcases how to reduce latency and improve global content delivery with **S3 buckets** as origins across multiple regions and a **CloudFront Function** for dynamic routing based on the user's **geographic location**.

## Key Highlights

- 🌍 **Global Content Distribution:** Deploy S3 buckets in multiple AWS regions for better regional performance.
- 🚀 **Dynamic Origin Routing:** Use CloudFront Functions to intelligently route requests to the nearest S3 bucket based on the viewer's geographic location.
- 🔒 **Secure Infrastructure:** Implement robust S3 bucket policies and CloudFront configurations for enhanced security.

## Table of Contents

1. [Features](#features)
2. [Architecture](#architecture)
3. [Key Concepts](#key-concepts)
4. [Demo](#demo)
5. [Limitations](#limitations)
6. [Usage](#usage)
7. [Cleanup](#cleanup)
8. [Geodata](#geodata)
9. [Extended Version](#extended-version)
10. [License](#license)
11. [Disclaimer](#disclaimer)

## Features

### Technical Capabilities
- Multi-region S3 bucket deployment
- CloudFront distribution with dynamic origin selection
- Geographic-based request routing
- Scalable and repeatable IaC-based infrastructure

### Performance Benefits
- Reduced latency through geoproximity-based routing
- Enhanced global user experience
- Increased content availability via multi-region redundancy

## Architecture

### Components
- **S3 Buckets**: Distributed across multiple AWS regions to serve as content origins.
- **CloudFront Distribution**: A global CDN to cache and deliver content efficiently.
- **CloudFront Function**: Custom JavaScript for intelligent origin selection.
- **Bucket Policies**: Secure and control access to content stored in S3.

### Workflow
1. A user request is received by CloudFront.
2. The CloudFront Function evaluates the user's geographic location.
3. The function determines the nearest S3 origin.
4. Content is served from the closest region, leveraging caching to improve subsequent request performance.

## Key Concepts

### Geographic Routing

The CloudFront Function determines:
- The viewer's location at the country level.
- The closest AWS region with an S3 origin.
- Routes requests dynamically to minimize latency.

### Infrastructure as Code (IaC)
- Fully reproducible using AWS CloudFormation templates.
- Version-controlled for consistency and scalability.
- Ensures environments are predictable across deployments.

## Demo

To showcase the functionality of dynamic routing, we have deployed the stack in the following AWS regions: `us-east-1`, `eu-central-1`, `ap-southeast-2`, and `sa-east-1`.

Each region hosts a unique image file labeled with the region's name. When you access the [CloudFront distribution URL](https://efficientsolutions.xyz/link/npzmv/) in your browser, the system dynamically routes your request to the nearest region based on your geographic location. The image displayed will confirm the region that served your request.

### Example:

- A user in North America will see an image labeled us-east-1.
- A user in Europe will see an image labeled eu-central-1.

This demo highlights the system's ability to optimize content delivery by minimizing latency through geoproximity-based routing.

To test further, consider using VPN services to simulate requests from different locations around the globe.

## Limitations

- **Country-Based Routing:** The geographic routing operates at a country level, which might not always be precise for regions near borders.
- **Static Content Replication:** Content must be manually replicated or synchronized across S3 buckets.
- **AWS Region Compatibility:** Ensure all AWS regions in the deployment support the required services.

**Note**: This is a Proof of Concept (PoC). It is recommended to test and adapt the solution thoroughly for production use.

## Usage

### Prerequisites

- An AWS account with CLI configured and appropriate credentials.
- Basic knowledge of AWS services such as CloudFormation, S3, and CloudFront.

### Deployment

1. Clone the Repository
      ```bash
      git clone https://github.com/efficient-solutions/aws-iac-cdn-multi-region-poc.git
      cd aws-iac-cdn-multi-region-poc
      ```

2. Set Up CloudFormation Roles
(skip if roles `AWSCloudFormationStackSetAdministrationRole` and `AWSCloudFormationStackSetExecutionRole` already exist)

      ```bash
      aws cloudformation deploy --template-file roles.yml \
            --stack-name cloudformation-stack-sets-permissions \
            --capabilities CAPABILITY_NAMED_IAM
      ```

      > See [Region and permission requirements for stack set operations](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-prereqs.html) for more details.

3.	Create the Stack Set    
      ```bash
      aws cloudformation create-stack-set \
      --stack-set-name aws-iac-cdn-multi-region-poc \
      --template-body file://template.yml \
      --capabilities CAPABILITY_AUTO_EXPAND \
      --parameters \
            ParameterKey=ProjectId,ParameterValue=aws-iac-cdn-multi-region-poc \
            ParameterKey=Regions,ParameterValue='us-east-1 eu-central-1 ap-southeast-2 sa-east-1'
      ```

      > **ProjectId**: A unique identifier used in bucket names.

      > **Regions**: Space-separated list of AWS regions for deployment (e.g., 'us-east-1 eu-central-1 ap-southeast-2 sa-east-1'). This list must always include `us-east-1`.

      > **Note:** Replace `create-stack-set` with `update-stack-set` if you later need make any changes.

4. Deploy Stack Instances
      ```bash
      aws cloudformation create-stack-instances \
      --stack-set-name aws-iac-cdn-multi-region-poc \
      --regions us-east-1 eu-central-1 ap-southeast-2 sa-east-1 \
      --accounts 000000000000 \
      --operation-preferences RegionConcurrencyType=PARALLEL
      ```

      > **stack-set-name:** Same as in previous step.

      > **accounts:** Set the ID of your AWS account.

5.	Upload Static Files

Once the StackSet is deployed (the status can be found in the Console: CloudFormation / StackSets / YOU_STACKSET_NAME):
 - Upload static content to the S3 buckets in each region.
 - Maintain consistent filenames and folder structures across regions.

6.	Retrieve CloudFront Distribution URL
 - Check the CloudFormation stack's Outputs section in the primary region for the CloudFrontDefaultDomainUrl.

## Cleanup

To delete the resources created by this template, first empty all S3 buckets and then run the following commands:

### Remove Stack Instances

```bash
aws cloudformation delete-stack-instances \
--stack-set-name aws-iac-cdn-multi-region-poc \
--regions us-east-1 eu-central-1 ap-southeast-2 sa-east-1 \
--accounts 000000000000 \
--operation-preferences RegionConcurrencyType=PARALLEL \
--no-retain-stacks
```
### Delete Stack Set

```bash
aws cloudformation delete-stack-set \
--stack-set-name aws-iac-cdn-multi-region-poc
```

## Geodata

This project uses the following geographic coordinates to determine the closest origin.

### Countries

```javascript
{
  AF: { lat: 33.9391, lon: 67.7100 }, // Afghanistan
  AL: { lat: 41.1533, lon: 20.1683 }, // Albania
  DZ: { lat: 28.0339, lon: 1.6596 },  // Algeria
  AD: { lat: 42.5462, lon: 1.6016 },  // Andorra
  AO: { lat: -11.2027, lon: 17.8739 }, // Angola
  AG: { lat: 17.0608, lon: -61.7964 }, // Antigua and Barbuda
  AR: { lat: -38.4161, lon: -63.6167 }, // Argentina
  AM: { lat: 40.0691, lon: 45.0382 }, // Armenia
  AU: { lat: -25.2744, lon: 133.7751 }, // Australia
  AT: { lat: 47.5162, lon: 14.5501 }, // Austria
  AZ: { lat: 40.1431, lon: 47.5769 }, // Azerbaijan
  BS: { lat: 25.0343, lon: -77.3963 }, // Bahamas
  BH: { lat: 26.0667, lon: 50.5577 }, // Bahrain
  BD: { lat: 23.6850, lon: 90.3563 }, // Bangladesh
  BB: { lat: 13.1939, lon: -59.5432 }, // Barbados
  BY: { lat: 53.7098, lon: 27.9534 }, // Belarus
  BE: { lat: 50.8503, lon: 4.3517 },  // Belgium
  BZ: { lat: 17.1899, lon: -88.4976 }, // Belize
  BJ: { lat: 9.3077, lon: 2.3158 },   // Benin
  BT: { lat: 27.5142, lon: 90.4336 }, // Bhutan
  BO: { lat: -16.2902, lon: -63.5887 }, // Bolivia
  BA: { lat: 43.9159, lon: 17.6791 }, // Bosnia and Herzegovina
  BW: { lat: -22.3285, lon: 24.6849 }, // Botswana
  BR: { lat: -14.2350, lon: -51.9253 }, // Brazil
  BN: { lat: 4.5353, lon: 114.7277 }, // Brunei
  BG: { lat: 42.7339, lon: 25.4858 }, // Bulgaria
  BF: { lat: 12.2383, lon: -1.5616 }, // Burkina Faso
  BI: { lat: -3.3731, lon: 29.9189 }, // Burundi
  KH: { lat: 12.5657, lon: 104.9910 }, // Cambodia
  CM: { lat: 3.8480, lon: 11.5021 },  // Cameroon
  CA: { lat: 56.1304, lon: -106.3468 }, // Canada
  CV: { lat: 16.5388, lon: -23.0418 }, // Cape Verde
  CF: { lat: 6.6111, lon: 20.9394 },  // Central African Republic
  TD: { lat: 15.4542, lon: 18.7322 }, // Chad
  CL: { lat: -35.6751, lon: -71.5430 }, // Chile
  CN: { lat: 35.8617, lon: 104.1954 }, // China
  CO: { lat: 4.5709, lon: -74.2973 }, // Colombia
  KM: { lat: -11.8750, lon: 43.8722 }, // Comoros
  CG: { lat: -0.2280, lon: 15.8277 }, // Congo
  CD: { lat: -4.0383, lon: 21.7587 }, // DR Congo
  CR: { lat: 9.7489, lon: -83.7534 }, // Costa Rica
  HR: { lat: 45.1000, lon: 15.2000 }, // Croatia
  CU: { lat: 21.5218, lon: -77.7812 }, // Cuba
  CY: { lat: 35.1264, lon: 33.4299 }, // Cyprus
  CZ: { lat: 49.8175, lon: 15.4730 }, // Czech Republic
  DK: { lat: 56.2639, lon: 9.5018 },  // Denmark
  DJ: { lat: 11.8251, lon: 42.5903 }, // Djibouti
  DM: { lat: 15.4150, lon: -61.3710 }, // Dominica
  DO: { lat: 18.7357, lon: -70.1627 }, // Dominican Republic
  EC: { lat: -1.8312, lon: -78.1834 }, // Ecuador
  EG: { lat: 26.8206, lon: 30.8025 }, // Egypt
  SV: { lat: 13.7942, lon: -88.8965 }, // El Salvador
  GQ: { lat: 1.6508, lon: 10.2679 }, // Equatorial Guinea
  ER: { lat: 15.1794, lon: 39.7823 }, // Eritrea
  EE: { lat: 58.5953, lon: 25.0136 }, // Estonia
  SZ: { lat: -26.5225, lon: 31.4659 }, // Eswatini
  ET: { lat: 9.1450, lon: 40.4897 }, // Ethiopia
  FJ: { lat: -17.7134, lon: 178.0650 }, // Fiji
  FI: { lat: 61.9241, lon: 25.7482 }, // Finland
  FR: { lat: 46.6034, lon: 1.8883 },  // France
  GA: { lat: -0.8037, lon: 11.6094 }, // Gabon
  GM: { lat: 13.4432, lon: -15.3101 }, // Gambia
  GE: { lat: 42.3154, lon: 43.3569 }, // Georgia
  DE: { lat: 51.1657, lon: 10.4515 }, // Germany
  GH: { lat: 7.9465, lon: -1.0232 }, // Ghana
  GR: { lat: 39.0742, lon: 21.8243 }, // Greece
  GD: { lat: 12.1165, lon: -61.6790 }, // Grenada
  GT: { lat: 15.7835, lon: -90.2308 }, // Guatemala
  GN: { lat: 9.9456, lon: -9.6966 },  // Guinea
  GW: { lat: 11.8037, lon: -15.1804 }, // Guinea-Bissau
  GY: { lat: 4.8604, lon: -58.9302 }, // Guyana
  HT: { lat: 18.9712, lon: -72.2852 }, // Haiti
  HN: { lat: 15.1999, lon: -86.2419 }, // Honduras
  HU: { lat: 47.1625, lon: 19.5033 }, // Hungary
  IS: { lat: 64.9631, lon: -19.0208 }, // Iceland
  IN: { lat: 20.5937, lon: 78.9629 }, // India
  ID: { lat: -0.7893, lon: 113.9213 }, // Indonesia
  IR: { lat: 32.4279, lon: 53.6880 }, // Iran
  IQ: { lat: 33.2232, lon: 43.6793 }, // Iraq
  IE: { lat: 53.1424, lon: -7.6921 }, // Ireland
  IL: { lat: 31.0461, lon: 34.8516 }, // Israel
  IT: { lat: 41.8719, lon: 12.5674 }, // Italy
  JM: { lat: 18.1096, lon: -77.2975 }, // Jamaica
  JP: { lat: 36.2048, lon: 138.2529 }, // Japan
  JO: { lat: 30.5852, lon: 36.2384 }, // Jordan
  KZ: { lat: 48.0196, lon: 66.9237 }, // Kazakhstan
  KE: { lat: -1.2864, lon: 36.8172 }, // Kenya
  KI: { lat: -3.3704, lon: -168.7340 }, // Kiribati
  KP: { lat: 40.3399, lon: 127.5101 }, // North Korea
  KR: { lat: 35.9078, lon: 127.7669 }, // South Korea
  KW: { lat: 29.3117, lon: 47.4818 }, // Kuwait
  KG: { lat: 41.2044, lon: 74.7661 }, // Kyrgyzstan
  LA: { lat: 19.8563, lon: 102.4955 }, // Laos
  LV: { lat: 56.8796, lon: 24.6032 }, // Latvia
  LB: { lat: 33.8547, lon: 35.8623 }, // Lebanon
  LS: { lat: -29.6099, lon: 28.2336 }, // Lesotho
  LR: { lat: 6.4281, lon: -9.4295 },  // Liberia
  LY: { lat: 26.3351, lon: 17.2283 }, // Libya
  LI: { lat: 47.1660, lon: 9.5554 },  // Liechtenstein
  LT: { lat: 55.1694, lon: 23.8813 }, // Lithuania
  LU: { lat: 49.8153, lon: 6.1296 }, // Luxembourg
  MG: { lat: -18.7669, lon: 46.8691 }, // Madagascar
  MW: { lat: -13.2543, lon: 34.3015 }, // Malawi
  MY: { lat: 4.2105, lon: 101.9758 }, // Malaysia
  MV: { lat: 3.2028, lon: 73.2207 }, // Maldives
  ML: { lat: 17.5707, lon: -3.9962 }, // Mali
  MT: { lat: 35.8999, lon: 14.5146 }, // Malta
  MH: { lat: 7.1315, lon: 171.1845 }, // Marshall Islands
  MR: { lat: 21.0079, lon: -10.9408 }, // Mauritania
  MU: { lat: -20.3484, lon: 57.5522 }, // Mauritius
  MX: { lat: 23.6345, lon: -102.5528 }, // Mexico
  FM: { lat: 7.4256, lon: 150.5508 }, // Micronesia
  MD: { lat: 47.4116, lon: 28.3699 }, // Moldova
  MC: { lat: 43.7333, lon: 7.4167 },  // Monaco
  MN: { lat: 46.8625, lon: 103.8467 }, // Mongolia
  ME: { lat: 42.7087, lon: 19.3744 }, // Montenegro
  MA: { lat: 31.7917, lon: -7.0926 }, // Morocco
  MZ: { lat: -18.6657, lon: 35.5296 }, // Mozambique
  MM: { lat: 21.9162, lon: 95.9560 }, // Myanmar
  NA: { lat: -22.9576, lon: 18.4904 }, // Namibia
  NR: { lat: -0.5228, lon: 166.9315 }, // Nauru
  NP: { lat: 28.3949, lon: 84.1240 }, // Nepal
  NL: { lat: 52.1326, lon: 5.2913 },  // Netherlands
  NZ: { lat: -40.9006, lon: 174.8860 }, // New Zealand
  NI: { lat: 12.8654, lon: -85.2072 }, // Nicaragua
  NE: { lat: 17.6078, lon: 8.0817 },  // Niger
  NG: { lat: 9.0817, lon: 8.6753 },   // Nigeria
  MK: { lat: 41.6086, lon: 21.7453 }, // North Macedonia
  NO: { lat: 60.4720, lon: 8.4689 },  // Norway
  OM: { lat: 21.4735, lon: 55.9754 }, // Oman
  PK: { lat: 30.3753, lon: 69.3451 }, // Pakistan
  PW: { lat: 7.5150, lon: 134.5825 }, // Palau
  PA: { lat: 8.5379, lon: -80.7821 }, // Panama
  PG: { lat: -6.3149, lon: 143.9555 }, // Papua New Guinea
  PY: { lat: -23.4425, lon: -58.4438 }, // Paraguay
  PE: { lat: -9.1900, lon: -75.0152 }, // Peru
  PH: { lat: 12.8797, lon: 121.7740 }, // Philippines
  PL: { lat: 51.9194, lon: 19.1451 }, // Poland
  PT: { lat: 39.3999, lon: -8.2245 }, // Portugal
  QA: { lat: 25.3548, lon: 51.1839 }, // Qatar
  RO: { lat: 45.9432, lon: 24.9668 }, // Romania
  RU: { lat: 61.5240, lon: 105.3188 }, // Russia
  RW: { lat: -1.9403, lon: 29.8739 }, // Rwanda
  KN: { lat: 17.3578, lon: -62.7830 }, // Saint Kitts and Nevis
  LC: { lat: 13.9094, lon: -60.9789 }, // Saint Lucia
  VC: { lat: 13.2528, lon: -61.1971 }, // Saint Vincent and the Grenadines
  WS: { lat: -13.7590, lon: -172.1046 }, // Samoa
  SM: { lat: 43.9336, lon: 12.4509 }, // San Marino
  ST: { lat: 0.1864, lon: 6.6131 },  // Sao Tome and Principe
  SA: { lat: 23.8859, lon: 45.0792 }, // Saudi Arabia
  SN: { lat: 14.4974, lon: -14.4524 }, // Senegal
  RS: { lat: 44.0165, lon: 21.0059 }, // Serbia
  SC: { lat: -4.6796, lon: 55.4920 }, // Seychelles
  SL: { lat: 8.4606, lon: -11.7799 }, // Sierra Leone
  SG: { lat: 1.3521, lon: 103.8198 }, // Singapore
  SK: { lat: 48.6690, lon: 19.6990 }, // Slovakia
  SI: { lat: 46.1512, lon: 14.9955 }, // Slovenia
  SB: { lat: -9.6457, lon: 160.1562 }, // Solomon Islands
  SO: { lat: 5.1521, lon: 46.1996 }, // Somalia
  ZA: { lat: -30.5595, lon: 22.9375 }, // South Africa
  SS: { lat: 7.8627, lon: 29.6949 }, // South Sudan
  ES: { lat: 40.4637, lon: -3.7492 }, // Spain
  LK: { lat: 7.8731, lon: 80.7718 }, // Sri Lanka
  SD: { lat: 12.8628, lon: 30.2176 }, // Sudan
  SR: { lat: 3.9193, lon: -56.0278 }, // Suriname
  SE: { lat: 60.1282, lon: 18.6435 }, // Sweden
  CH: { lat: 46.8182, lon: 8.2275 }, // Switzerland
  SY: { lat: 34.8021, lon: 38.9968 }, // Syria
  TW: { lat: 23.6978, lon: 120.9605 }, // Taiwan
  TJ: { lat: 38.8610, lon: 71.2761 }, // Tajikistan
  TZ: { lat: -6.3690, lon: 34.8888 }, // Tanzania
  TH: { lat: 15.8700, lon: 100.9925 }, // Thailand
  TL: { lat: -8.8742, lon: 125.7275 }, // Timor-Leste
  TG: { lat: 8.6195, lon: 0.8248 },  // Togo
  TO: { lat: -21.1789, lon: -175.1982 }, // Tonga
  TT: { lat: 10.6918, lon: -61.2225 }, // Trinidad and Tobago
  TN: { lat: 33.8869, lon: 9.5375 }, // Tunisia
  TR: { lat: 38.9637, lon: 35.2433 }, // Turkey
  TM: { lat: 38.9697, lon: 59.5563 }, // Turkmenistan
  TV: { lat: -7.1095, lon: 177.6493 }, // Tuvalu
  UG: { lat: 1.3733, lon: 32.2903 }, // Uganda
  UA: { lat: 48.3794, lon: 31.1656 }, // Ukraine
  AE: { lat: 23.4241, lon: 53.8478 }, // United Arab Emirates
  GB: { lat: 55.3781, lon: -3.4360 }, // United Kingdom
  US: { lat: 37.0902, lon: -95.7129 }, // United States
  UY: { lat: -32.5228, lon: -55.7658 }, // Uruguay
  UZ: { lat: 41.3775, lon: 64.5853 }, // Uzbekistan
  VU: { lat: -15.3767, lon: 166.9592 }, // Vanuatu
  VE: { lat: 6.4238, lon: -66.5897 }, // Venezuela
  VN: { lat: 14.0583, lon: 108.2772 }, // Vietnam
  YE: { lat: 15.5527, lon: 48.5164 }, // Yemen
  ZM: { lat: -13.1339, lon: 27.8493 }, // Zambia
  ZW: { lat: -19.0154, lon: 29.1549 }  // Zimbabwe
}
```

### AWS Regions

```javascript
{
  'us-east-1': { lat: 37.7749, lon: -77.0369 }, // Northern Virginia
  'us-east-2': { lat: 40.4173, lon: -82.9071 }, // Ohio
  'us-west-1': { lat: 37.3382, lon: -121.8863 }, // California
  'us-west-2': { lat: 45.5051, lon: -122.6750 }, // Oregon
  'af-south-1': { lat: -33.9249, lon: 18.4241 }, // Cape Town, South Africa
  'ap-east-1': { lat: 22.3193, lon: 114.1694 }, // Hong Kong
  'ap-south-1': { lat: 19.0760, lon: 72.8777 }, // Mumbai, India
  'ap-south-2': { lat: 12.9716, lon: 77.5946 }, // Hyderabad, India
  'ap-southeast-1': { lat: 1.3521, lon: 103.8198 }, // Singapore
  'ap-southeast-2': { lat: -33.8688, lon: 151.2093 }, // Sydney, Australia
  'ap-southeast-3': { lat: -6.2088, lon: 106.8456 }, // Jakarta, Indonesia
  'ap-southeast-4': { lat: -41.2865, lon: 174.7762 }, // Melbourne, Australia
  'ap-northeast-1': { lat: 35.6895, lon: 139.6917 }, // Tokyo, Japan
  'ap-northeast-2': { lat: 37.5665, lon: 126.9780 }, // Seoul, South Korea
  'ap-northeast-3': { lat: 34.6937, lon: 135.5023 }, // Osaka, Japan
  'ca-central-1': { lat: 43.651070, lon: -79.347015 }, // Toronto, Canada
  'cn-north-1': { lat: 39.9042, lon: 116.4074 }, // Beijing, China
  'cn-northwest-1': { lat: 38.3417, lon: 106.6177 }, // Ningxia, China
  'eu-central-1': { lat: 50.1109, lon: 8.6821 }, // Frankfurt, Germany
  'eu-central-2': { lat: 46.9481, lon: 7.4474 }, // Zurich, Switzerland
  'eu-north-1': { lat: 59.3293, lon: 18.0686 }, // Stockholm, Sweden
  'eu-south-1': { lat: 41.9028, lon: 12.4964 }, // Milan, Italy
  'eu-south-2': { lat: 38.7169, lon: -9.1399 }, // Lisbon, Portugal
  'eu-west-1': { lat: 53.3498, lon: -6.2603 }, // Dublin, Ireland
  'eu-west-2': { lat: 51.5074, lon: -0.1278 }, // London, United Kingdom
  'eu-west-3': { lat: 48.8566, lon: 2.3522 }, // Paris, France
  'il-central-1': { lat: 31.7683, lon: 35.2137 }, // Tel Aviv, Israel
  'me-central-1': { lat: 25.2048, lon: 55.2708 }, // Dubai, UAE
  'me-south-1': { lat: 26.2332, lon: 50.6071 }, // Bahrain
  'sa-east-1': { lat: -23.5505, lon: -46.6333 }, // São Paulo, Brazil
}
```

## Extended Version

We also offer a [commercial version](https://efficientsolutions.xyz/aws-iac-cdn-multi-region/) of this solution with the following enhancements:

- **Automatic Content Replication:** Automated synchronization of static files between primary and additional S3 buckets, simplifying content management across regions.
- **Custom Domain Support:** Seamless integration with Route 53 and AWS Certificate Manager (ACM) to use custom domains with HTTPS.
- **Access Logging:** CloudFront access logs enabled for detailed insights into user activity and performance metrics.

This version provides additional flexibility and enhanced management features for more complex use cases.

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

## Disclaimer

This software product is not affiliated with, endorsed by, or sponsored by Amazon Web Services (AWS) or Amazon.com, Inc. The use of the term "AWS" is solely for descriptive purposes to indicate that the software is compatible with AWS services. Amazon Web Services and AWS are trademarks of Amazon.com, Inc. or its affiliates.
