---
repo: masudur-rahman-niloy/social-signin
url: 'https://github.com/masudur-rahman-niloy/social-signin'
homepage: null
starredAt: '2025-01-14T21:28:39Z'
createdAt: '2021-07-17T09:27:25Z'
updatedAt: '2025-01-14T21:28:39Z'
language: Python
license: NA
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:14.614Z'
description: null
tags: []
---

### SAM configuration 

1. We used SAM and nested SAM here. We use dfferent stack for different component. Here auth-stack is a nested SAM. We can add our all environment information in main template and pass it to nested SAM. We have to run following command to use this application:
   **sam build**
Then   
   **sam deploy --guided --profile profile_name** for first time deploy. If we change anything then we need to build and run following command.
   **sam deploy --profile profile_name**

1. After successful completion, we have to deploy main template's API gateway this from console like following (We have to do it ofr the first time only):
   
    ![Screenshot from 2021-09-26 12-39-56](https://user-images.githubusercontent.com/77866740/134796693-47c66064-a8f8-4f63-ab81-152efed00975.jpg)  

   Then click on mike-app, then **Resource -> Actions -> deployAPI**

   ![Screenshot from 2021-09-26 12-39-02](https://user-images.githubusercontent.com/77866740/134796789-32c021cf-3077-4037-840d-61b8f9f60ddb.jpg)


    ![Screenshot from 2021-09-26 12-39-08](https://user-images.githubusercontent.com/77866740/134796833-5d396712-8d0e-4279-b921-588eb3add077.jpg)

1. In mapping section we can add different environment information like dev, stage, prod in main tempalte:

    ![Screenshot from 2021-09-26 12-01-14](https://user-images.githubusercontent.com/77866740/134795745-55ea93cc-66a5-436c-a0a3-7dd32bf67364.png)

1. Then use this information to pass to nested SAM like following:

    ![Screenshot from 2021-09-26 12-05-59](https://user-images.githubusercontent.com/77866740/134795773-54cd07bd-c170-449a-9692-4eac799b02fb.png)

1. In Nested SAM (auth-stack template), we have to use following configuration in user-pool-client creation for federated sign-in (Line 384 - 420, auth-stack template):

    ![Screenshot from 2021-09-26 12-10-27](https://user-images.githubusercontent.com/77866740/134795836-c7861f2b-9dde-4058-86c3-253d11513c2e.png)

1. For gmail and facebook we need following configuration (Line 424 - 455, auth-stack template):

    ![Screenshot from 2021-09-26 12-15-11](https://user-images.githubusercontent.com/77866740/134795948-4851ccf1-d400-4872-9088-1b6349039cec.png)

1. Identity pool creation (Line 457 - 464) and Identity Pool Role Mapping (Line 466 - 478):

    ![Screenshot from 2021-09-26 12-33-02](https://user-images.githubusercontent.com/77866740/134796450-b0adfa88-aa61-471c-acc2-34edd3894697.png)


### Forntend integration

1. We have to make URL with following way:
    
    **Login: "${cognito_domain_name}/oauth2/authorize?identity_provider=${identity_provider}&redirect_uri=${redirect_uri}&response_type=CODE&client_id=${cognito_app_client_id}&scope=email openid profile aws.cognito.signin.user.admin"**

    **Logout: "${cognito_domain_name}/logout?client_id=${cognito_app_client_id}&logout_uri=${logout_uri}"**

    cognito_domain_name = https://spendwell-auth-stack-dev.auth.us-west-2.amazoncognito.com
    redirect_uri = http://localhost:4200/dashboard/  
    cognito_app_client_id = 69597g8135osh4oo1tr35i7f4i
    identity_provider = Facebook or Google
    logout_uri = http://localhost:4200/login/

    **Gmail Login Example: <a href="https://spendwell-auth-stack-dev.auth.us-west-2.amazoncognito.com/oauth2/authorize?identity_provider=Google&redirect_uri=http://localhost:4200/dashboard/&response_type=CODE&client_id=69597g8135osh4oo1tr35i7f4i&scope=email openid profile aws.cognito.signin.user.admin">Signin with Google</a>**

    **FB Login Example: <a href="https://spendwell-auth-stack-dev.auth.us-west-2.amazoncognito.com/oauth2/authorize?identity_provider=Facebook&redirect_uri=http://localhost:4200/dashboard/&response_type=CODE&client_id=69597g8135osh4oo1tr35i7f4i&scope=email openid profile aws.cognito.signin.user.admin">Signin with Facebook</a>**

    **Logout URL Example: <a href="https://spendwell-auth-stack-dev.auth.us-west-2.amazoncognito.com/logout?client_id=69597g8135osh4oo1tr35i7f4i&logout_uri=http://localhost:4200/login/">Facebook & Google Logout</a>**

1. To get authentication token we have to send following parameters and url:
    parameters:
        fromObject: {
            grant_type: "authorization_code",
            client_id: "69597g8135osh4oo1tr35i7f4i",
            code: code,
            redirect_uri: "http://localhost:4200/dashboard/"
        }
    method: post
    url: ${cognito_domain_name}/oauth2/token
        ex: **https://spendwell-auth-stack-dev.auth.us-west-2.amazoncognito.com/oauth2/token**

### Configuration For Google Sign In:

1. If there is no project created earlier, then first create a project like the following image from Google API Console. Click on “New Project” from the right corner of this page. 

![Screenshot from 2021-07-17 08-05-04](https://user-images.githubusercontent.com/77866740/126026037-f77e9497-76cb-499b-9bca-e3b1b2ceca72.jpg)

1. Then you have to set a name for your project like as following image:

![Screenshot from 2021-07-17 08-05-32](https://user-images.githubusercontent.com/77866740/126026048-2416d1e0-c573-419f-b060-94e3a920d63f.jpg)

1. Then select that created project from the project list.
1. Then click on **Credentials**. Click on **Create Credentials** and choose "OAuth client ID."

![Screenshot from 2021-07-15 11-39-16](https://user-images.githubusercontent.com/77866740/126026073-e2508a0a-bac7-4712-8a22-b4e08f2cfa3d.jpg)
 
1. Then click on **Configure Consent Screen** like in the following image and then select **External** in consent screen and click on **Create** button.

![Screenshot from 2021-07-15 11-39-49](https://user-images.githubusercontent.com/77866740/126026083-1ec5e36b-d9ad-45dd-97b8-d7a078480478.jpg)


1. Then give **APP Name** and your email addresses in required fields and there is no need to configure any fields in this page and then click **Save and continue** for next two pages and then click on **Back to Dashboard** button.  

![Screenshot from 2021-07-15 11-40-28](https://user-images.githubusercontent.com/77866740/126026086-f28ec127-3834-4386-b851-e64dc705aadc.jpg)

1. After that again click on **Credentials** from the left side menu and then click on **Create Credentials** -> **OAuth Client Id**. Then you will get a dropdown. You have to select **Web Application** from that menu. Then you have to configure **Authorized JavaScript origins** and here we have to use cognito domain name like as "https://spendwell-auth-stack-dev.auth.us-west-2.amazoncognito.com" and **Authorized redirect URIs** by clicking on **Add URI** button and here we have to use link like **https://spendwell-auth-stack-dev.auth.us-west-2.amazoncognito.com/oauth2/idpresponse** - cognito_domain_name/oauth2/idpresponse. In gmail there is nothing to add for localhost. We have to give cognito **domain name** here.

![test](https://user-images.githubusercontent.com/77866740/126026103-169bde0b-d8eb-46ca-9324-bc448b912ba0.jpg)

1. Then you will get **App client id** and **client secret id** here. Please save these ids for further use.

![Screenshot from 2021-09-26 11-37-23](https://user-images.githubusercontent.com/77866740/134795106-fd33f446-8876-4045-8406-86cb36de51ff.jpg)             

### Configuration For Facebook SIgn-in:

1. You have to go https://developers.facebook.com/apps/?show_reminder=true for creating apps on facebook.
Then click on **Create App** and then choose any option like in following image:

![Screenshot from 2021-07-17 09-23-04](https://user-images.githubusercontent.com/77866740/126026192-6c4ca995-89d4-4953-88d8-b295dbb26187.jpg)

1. Then click **Continue** and then give app name and create new app:

![Screenshot from 2021-07-17 09-23-17](https://user-images.githubusercontent.com/77866740/126026200-8343d5a6-eae5-49c2-8a39-aa9d47af3743.jpg)

1. Then select **Settings** -> **Basic**. Here you will get App Id and App secret Id, store them for further use.

1. You have to give your application domain name in **App Domains** and  a public link of your application in **Privacy Policy URL** and **Terms of Service URL**. I have configured localhost here. If you want to configure your application’s live link then you have to give the live URL here.

![Screenshot from 2021-07-17 09-41-43](https://user-images.githubusercontent.com/77866740/126026203-e7ce88ce-8a39-4bb9-a2ce-7647d25f833b.jpg)

1. Then click on **Add Platform** button and select **Website** from the option and then your application site url here. If you want to give your application’s  live link then you have to give it instead of the localhost link. 

![Screenshot from 2021-07-17 09-35-18](https://user-images.githubusercontent.com/77866740/126026207-0bd1685b-90ad-47ea-ada3-e466d7e91fac.jpg)

![Screenshot from 2021-07-17 09-58-16](https://user-images.githubusercontent.com/77866740/126026209-6a11afff-5736-40c3-bd0c-7648f962234a.jpg)


1. For the live link you have to configure one more step. You don’t need to configure this for localhost. Form the left side menu, select **Add Product** and select **Facebook** from the options.
Then click **Facebook Login** -> **Settings** from the left side menu and give your application live redirect URI link in **Valid OAuth Redirect URIs**.

![Screenshot from 2021-07-17 11-03-55](https://user-images.githubusercontent.com/77866740/126026475-e1b2a868-d137-4c86-bcb4-aeb21b96e768.jpg)

1. Then click App Mode from upper menu and make it live.

![Screenshot from 2021-07-17 11-03-55(1)](https://user-images.githubusercontent.com/77866740/126026479-8540fbf2-d544-40c3-a163-a18a1e2978c4.jpg)





