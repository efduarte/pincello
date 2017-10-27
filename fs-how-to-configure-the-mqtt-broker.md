# How to Configure the MQTT Broker

Don't worry. There is nothing wrong in not knowing what's an MQTT broker. The [MQTT](http://mqtt.org/) protocol is used in Pincello because it is a lightweight and easy way of sending and receiving messages between devices, even in unreliable networks, such as a mobile connection. In the MQTT protocol, an MQTT broker acts as a central hub to which clients connect. The broker receives all published messages, and then send them out to interested clients.

There are a lot of MQTT Broker platforms available online. Among them, [shiftr.io](https://shiftr.io/) was chosen for being free, easy to use, well documented, and also providing compelling visualizations of the exchange of messages.

![shiftr.io homepage](_images/fs-shiftrio.png)

## 1. Create a shiftr.io Account

Access [https://shiftr.io/sign-up](https://shiftr.io/sign-up) and create your account. The whole process is very simple and straightforward: you just need to fill in a profile name (only characters, numbers, and dashes), your e-mail and a password.

![shiftr.io sign-up page](_images/fs-shiftrio-signup.png)

## 2. Create a Namespace for Your Project

Now that you have created your shiftr.io account, the next step to connect things to it is to create a namespace. You can think of namespaces as isolated projects. Access [https://shiftr.io/new](https://shiftr.io/new) and create one. You can choose any name you want (as long as it contains only characters, numbers, and dashes). You can also give it an optional description.

As a suggestion, you can call your first namespace `pincello-first-steps`.

![shiftr.io namespace page](_images/fs-shiftrio-namespace.png)

## 3. Create Access Tokens for Your Devices

With a namespace ready, now you need to create access tokens. It is recommended to create an individual token for each client you intend to connect to this namespace. To do that, in your namespace page you have to click on `Namespace Settings`, and then on `Add Token`. You will find that the form comes filled with a random key 🔑 (username) and secret 🤐 (password), you can use these or edit them to something of your liking (but keep in mind that the key must be unique on shiftr.io). You also need to choose between `full-access` (publish and subscribe) and `read-only` (subscribe only) permissions. Lastly, there is the option of providing an optional description.

?> **🔒 Security**: the `read-only` permission provides a layer of security: access to key and secret allows only to subscribe to topics, not publish to them. This permission is a good practice for clients that do not intend to publish messages.

![shiftr.io token page](_images/fs-shiftrio-token.png)

For this guide, you will create two tokens with full access permissions: one for the microcontroller, and another for a web page that will be created to communicate with the microcontroller (you can use the key or the description field to identify them). After creating some tokens, your list of tokens will show them in the following format:

>KEY / SECRET<br/>mqtt://KEY:SECRET@broker.shiftr.io

Hold on to that information, as it will be used in the next parts of our guide.

Now that you finished configuring the MQTT Broker, it's time to learn [how to program the microcontroller](fs-how-to-program-the-microcontroller.md).