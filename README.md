# vnwork-2-dingtalk

Project aims to have an intuitive webservice to integrate with Search engine of [Vietnamworks](https://www.vietnamworks.com/)

Upon trigger, we expect to have relevant jobs to be sent as notification to Dingtalk.

Project was built based on https://github.com/sluongng/alicloud-fc-ts-template using TypeScript

## Why?

1. On VietnamWorks, often **Salary, MinSalary, MaxSalary** and other relevant information about a Job Listing are hidden on the UI.
    Here we aim to highlight these information.
    To find out more on what kind of information is available, read [This](https://github.com/sluongng/vnwork-2-dingtalk/blob/master/src/algolia/model.ts#L121)

2. Its convinience for me to receive notification via DingTalk.

## How?

VietnamWork(VNW) Search Engine is a 3rd party service called [Algolia](https://www.algolia.com/doc/)

But instead of having their GUI-ClientSide requesting ServerSide which aggergrate/filter information from Algolia Search Engine, VNW made it so that their Web-GUI client called Algolia directly.

As a result, information about their ApplicationID, ApiKey,... needed to be available from the client side so that the web browser could make a valid request to Algolia.

Moreover, this also lead to all the data, which VNW uploaded to Algolia to help with Search Indexing, became publicly available and is opened for datamining.

## Screenshot

Example request from VNW Web-gui (Desktop, Chrome)

![](https://i.imgur.com/4H123cP.png)

This is how the job listing will look like when posted into Dingtalk chat channel.

<p align="center">
  <img width="221" height="544" src="https://i.imgur.com/rAFg28R.png">
</p>

## Disclaimer

I have never worked for Vietnamwork nor do i have any affiliation with said company.

The API information (Host, Credentials, etc...) are all available publicly via Vietnamwork web-client and can be obtained with minimal knowledge about web-programming.