# Our Readmap

We are thinking about how to balance personal information protection and service business.
Current services collect personal information, but in order to make more personalized recommendations, we need more important personal information.
However, the handling of personal information is getting stricter all over the world (e.g., GAFA issue).
So we came up with Personal Cloud Service to balance personal information protection and service business.

## What is PCS?

Personal Cloud Service is a cloud-based platform service that allows users to consolidate their personal information in a dedicated personal space in the cloud and use it to provide services at their discretion.

PCS is envisioned to consist of the following elements

* Personal Data Store
* Partner Assistant
* Service Sandbox

### Personal Data Store

Personal Data Store (PDS) is a data repository architecture for secure management of personal information. The PDS is a data repository architecture for secure management of personal information, allowing users to securely store their personal information (Deep Data) while allowing them to decide whether to use their personal information for services.

### Partner Assistant

The Partner Assistant is an AI assistant that learns from the personal information stored in the PDS. Since the Partner Assistant learns based on the user's detailed personal information, it can make the best proposal to the user as a dedicated assistant.

### Service Sandbox

Service Sandbox provides DRM protection and personal data sharing to provide PDS data to external service businesses with the user's consent.

By isolating these elements in a container in the cloud, we can create a world where personal information is always in the hands of the user and cannot be misused without their knowledge.

## What can you do with PCS?

By creating a market for services using PCS, our lives will be enriched.
PCS has highly important personal information (=Deep Data) that is securely managed using PDS and partner assistants that are trained with it.
<div style="text-align: center">
<img src="https://user-images.githubusercontent.com/16918590/102622160-fdd44400-4183-11eb-8551-54ee018bf8e0.png" width="450px" />
</div>

Service providers can register their product information in the PCS market, and the partner assistant will suggest the best service provider for you from the huge market.
Yes. The time is coming when the end users of targeting business will be replaced by AI.

## What does this have to do with homebridge?

This homebridge-assistant-ui is part of the PCS roadmap.

homebridge is both an emulator of the HomeKit API and a home server that can manage appliances for individual or family use only. This is very similar to PCS's isolated containers for each individual.

The homebridge-assistant-ui contains a log management server that mimics PDS. As an additional feature, we are planning to use this stored data for automation. We are planning to add automation using this stored data as an additional feature, which is to store the stored data at the user's hand (locally) like PDS, and provide services using the data.
The main 3D avatar of homebrideg-assistant-ui is intended to be a personal assistant. By using a 3D avatar of the user's choice, a personal assistant can be created for the user.

We believe homebridge could be the domain to introduce PCS.

## Let us know what you think.

homebridge-assistant-ui is part of the roadmap for PCS.
Let us know what you think about homebridge-assistant-ui and about PCS.
g2119026e3@edu.teu.ac.jp
