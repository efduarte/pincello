# Basic Communication Tutorial

Now that the MQTT Broker is configured and ready to use, and you're able to program our microcontroller, it's time to do something more interesting than blinking a LED 😎. In this guide you will build a playful two-way communication between two things by using the Internet: a circuit built with our microcontroller; and a simple web page built with the front-end languages HTML, CSS and JavaScript.

?> **🖥️ Do I need a web server?** Because this guide uses only simple front-end technologies, you will not need to install or use any kind of local or remote web server. A modern web browser will be enough. 

The interaction will be as follows:

- **Physical to Digital:** when you gently shake the breadboard (which contains the entire circuit), a digital representation of the Mona Lisa by Leonardo da Vinci 👨‍🎨🖼️ will also begin to shake inside the web page.
- **Digital to Physical:** when you control a set of three red, green and blue sliders on the web page, besides changing the background of the page, it will also change the color of the RGB LED in the circuit.

## 1. Build the Circuit

For this circuit, besides a breadboard and some jumpers, you will need:

- `1x` [ESP8266 NodeMCU 1.0 Microcontroller](essentials.md#esp8266-nodemcu-10-microcontroller)
- `1x` [Vibration Sensor (SW-420)](sensor-vibration-sw-420.md)
- `1x` [RGB LED](actuator-rgb-led.md)
- `3x` [330Ω Resistor](essentials.md#_330%ce%a9-resistor)

The circuit must be built according to the following representation (you don't need to use the exact same positions on the breadboard, as long as the represented connections are maintained):

![Circuito](_images/fs-circuit.png)

- **Vibration Sensor:** `D0` pin is connected to the microcontroller's `D0` pin (this naming is just a coincidence), `⏚` (the symbol for ground) is connected to `GND`, and `Vcc` to `3V3`.

- **RGB LED:** the red, green and blue pins are connected the microcontroller's `D5`, `D6` and `D7` respectively (with individual 330Ω resistors along the connection). The energy pin (the longest one) is connected to `GND`.

!> **⚡ Resistors:** always make sure to use the indicated resistors (330Ω in this case). If you use the wrong kind of resistor or forget to use one at all, you may damage your components.

?> **🚥 Common Cathode vs. Common Anode:** there are two kinds of RGB LEDs. The above example uses a common cathode one, so the energy pin is connected to `GND`. A common anode, on the other hand, should have the energy pin on `3V3`. It's easy to confuse between the two, so if your RGB LED seems broken maybe it's the other kind!

## 2. Program the Sketch

As the sketch will make use of a third-party library, you will need to install it first. To communicate with the MQTT Broker, a library made by the same person who created shiftr.io will be used: the [MQTT library for Arduino by Joel Gaehwiler](https://github.com/256dpi/arduino-mqtt). To install it, go to `Deviot > Find/Install Library` and search for `MQTT Joel Gaehwiler`. This search will return only the correct library, so go ahead and install it. Now create a `basic-communication` sketch:

!> **🔒 Credentials:** remember to edit lines 5 and 6 of the sketch with the shiftr.io microcontroller token you created in [How to Configure the MQTT Broker](fs-how-to-configure-the-mqtt-broker.md), and lines 11 and 12 with the Wi-Fi settings you will be using.

```arduino
#include <ESP8266WiFi.h>
#include <MQTTClient.h>

const char client_id[] = "microcontroller";     //arbitrary identification
const char client_key[] = "";                   //token KEY from shiftr.io
const char client_secret[] = "";                //token SECRET from shiftr.io

const char ssid[] = "";     //name of the used Wi-Fi network
const char pass[] = "";     //password of the Wi-Fi network

WiFiClient net;
MQTTClient client;
const int QoS = 1;

const int vibration_pin = D0;
const int red_pin = D5;
const int green_pin = D6;
const int blue_pin = D7;

int red = 255;
int green = 255;
int blue = 255;

boolean vibrating = false;
int count = 0;

void setup()
{
    Serial.begin(115200);

    pinMode(vibration_pin, INPUT);
    pinMode(red_pin, OUTPUT);
    pinMode(green_pin, OUTPUT);
    pinMode(blue_pin, OUTPUT);

    connectWIFI();
    client.begin("broker.shiftr.io", net);
    client.onMessage(messageReceived);
    connectMQTT();

    client.subscribe("/red");
    client.subscribe("/green");
    client.subscribe("/blue");
}

void loop()
{
    if (WiFi.status() != WL_CONNECTED)
    {
        connectWIFI();
    }
    client.loop();
    delay(10);  // fixes some issues with WiFi stability
    if (!client.connected())
    {
        connectMQTT();
    }

    setColor(red, green, blue);

    if (digitalRead(vibration_pin) == HIGH)
    {
        count = 0;
        if (vibrating == false)
        {
            vibrating = true;
            client.publish("/vibration", "1", false, QoS);
            Serial.println("Published: /vibration 1");
        }
    }
    else if (digitalRead(vibration_pin) == LOW)
    {
        if(vibrating == true)
        {
            count++;
            delay(10);
            if (count > 30)
            {
                vibrating = false;
                client.publish("/vibration", "0", false, QoS);
                Serial.println("Published: /vibration 0");
            }
        }
    }

}

void connectWIFI()
{
    Serial.print("Connecting Wi-Fi: ");
    WiFi.begin(ssid, pass);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }
    Serial.println(" Wi-Fi connected!");
}

void connectMQTT()
{
    Serial.print("Connecting MQTT: ");
    while (!client.connect(client_id, client_key, client_secret))
    {
        delay(500);
        Serial.print(".");
    }
    Serial.println(" MQTT connected!");
}

void messageReceived(String &topic, String &payload)
{
    Serial.println("New message: " + topic + " - " + payload);

    if (topic == "/red")
    {
        red = payload.toInt();
    }

    if (topic == "/green")
    {
        green = payload.toInt();
    }
    
    if (topic == "/blue")
    {
        blue = payload.toInt();
    }
}

void setColor(int r, int g, int b)
{
    r = map(r, 0, 255, 0, 1023);
    g = map(g, 0, 255, 0, 1023);
    b = map(b, 0, 255, 0, 1023);
    analogWrite(red_pin, r);
    analogWrite(green_pin, g);
    analogWrite(blue_pin, b);
}
```

This code is responsible for detecting vibrations with the SW-420 sensor and doing the following: when a vibration is detected, it publishes `1` to the `/vibration` topic in the shiftr.io account, and when the vibration stops, it publishes `0` to the same topic (there are some conditions in the code to avoid overloading the broker with unnecessary messages). At the same time, it subscribes to the `/red` `/green` and `/blue` topics, and any message published to these topics will be received by the microcontroller and used to set the color of the RGB LED.

Go ahead and upload this sketch to the microcontroller. However, keep in mind that it won't do much without the counterpart of this guide: the web page.

## 2. Build the Web Page

Inside your sketch folder, create the following empty text files (and folders, when necessary):

- `index.html`
- `css/style.css`
- `js/script.js`

Also create a `img` folder and download and place these two files whithin that folder: <a href="_images/monalisa.png" download>monalisa.jpg</a> and <a href="_images/monalisa2.png" download>monalisa2.jpg</a>.

Now you should have the following structure:

```
📁 basic-communication
│   📄 index.html
│   📄 basic-communication.ino
│
└───📁 css
│   │   📄 style.css
|
└───📁 img
│   │   🖼️ monalisa.png
│   │   🖼️ monalisa2.png
│   
└───📁 js
    │   📄 script.js

```

### 2.1. Create a Basic Page with HTML

Edit the `index.html` file with the following content:

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Basic Communication</title>
        <link rel="stylesheet" href="css/style.css">
    </head>

    <body>

        <input id="red" type="range" min="1" max="255" step="1" value="255" onchange="updateRed(this.value)"/><br />
        <input id="green" type="range" min="1" max="255" step="1" value="255" onchange="updateGreen(this.value)" /><br />
        <input id="blue" type="range" min="1" max="255" step="1" value="255" onchange="updateBlue(this.value)" />

        <div id="monalisa"></div>

        <script src="https://unpkg.com/mqtt/dist/mqtt.min.js"></script>
        <script src="js/script.js"></script>

    </body>
</html>
```

This file creates a simple web page with three sliders, a `#monalisa` element (empty for now), a external link to the latest version of the [MQTT.js](https://github.com/mqttjs/MQTT.js) library, and internal links to `css/style.css` and `js/script.js`, both of which will be created in the following steps.

### 2.2. Add Style to the Page with CSS

Edit the `css/style.css` file with the following content:

```css
input
{
    width: 100%;
}

#monalisa
{
    width: 269px;
    height: 400px;
    margin: 100px auto;
    background: url("../img/monalisa.png") no-repeat;
    box-shadow: 10px 10px 25px rgba(0,0,0, 0.8);
}

#monalisa.vibrating
{
    background: url("../img/monalisa2.png") no-repeat;
    animation: vibrate 0.1s infinite;
}

@keyframes vibrate
{
    10%, 90% { transform: translate3d(-5px, 5px, 0); }
    20%, 80% { transform: translate3d(10px, -10px, 0); }
    30%, 50%, 70% { transform: translate3d(-20px, 20px, 0); }
    40%, 60% { transform: translate3d(20px, -20px, 0); }
}
```

This file makes our sliders span across the entire page and defines two styles for the `#monalisa` element: a default style with an image of the original artwork from Leonardo da Vinci, and a vibrating style in which a different version of the painting is used and shaken with a vibration animation 😯.

### 2.3. Add Behavior to the Page with JavaScript

Edit the `js/script.js` file with the following content:

!> **🔒 Credentials:** remember to edit line 1 of the `js/script.js` file with the shiftr.io web page token you created in [How to Configure the MQTT Broker](fs-how-to-configure-the-mqtt-broker.md).

```javascript
var url = 'mqtt://KEY:SECRET@broker.shiftr.io';          //token KEY and SECRET from shiftr.io
var client = mqtt.connect(url, {clientId: 'web-page'});  //arbitrary identification
var QoS = 1;

var monalisa_element = document.getElementById("monalisa");
var html_element = document.getElementsByTagName("html")[0];

var red = 255;
var green = 255;
var blue = 255;

var red_element = document.getElementById("red");
var green_element = document.getElementById("green");
var blue_element = document.getElementById("blue");

function updateRed(value)
{
    red = value;
    updateRGB();
}

function updateGreen(value)
{
    green = value;
    updateRGB();
}

function updateBlue(value)
{
    red = blue;
    updateRGB();
}

function updateRGB()
{
    red = red_element.value;
    green = green_element.value;
    blue = blue_element.value;
    html_element.style.background = "rgb(" + red + "," + green + "," + blue + ")";
    publishTopic('/red', red);
    publishTopic('/green', green);
    publishTopic('/blue', blue);
}

client.on('connect', function()
{
    console.log("MQTT Connected!");
    client.subscribe('/vibration', { qos: QoS });
});

client.on('error', function(e)
{
    console.log(e);
});

function publishTopic(topic, valor)
{
    client.publish(topic, valor, { qos: QoS, retain: false });
    console.log("Published: " + topic + ": " + valor);
}

client.on('message', function(topic, message)
{
    console.log('New message:', topic, message.toString());

    if (topic == "/vibration")
    {
        if (parseInt(message) == 1)
        {
            monalisa_element.classList.add("vibrating");
        }
        else
        {
            monalisa_element.classList.remove("vibrating");
        }
    }

});
```

This code subscribes to the `/vibration` topic and does the following: when it receives `1`, it adds the class `vibrating` to the `#monalisa` element, and when it receives `0` it removes the `vibrating` class, returning the element to its original state. At the same time, it publishes values to the `/red` `/green` and `/blue` topics according to the user input on the three sliders, which also changes the background color of the page.

## 4. Enjoy Your First Project

If you correctly followed every step in this guide, your circuit and web page are already capable of communicating with each other 🎉! Power on your circuit, open your web page in a web browser and see if everything is working as it should. If you're having any problems, the serial monitor will be a useful tool for debugging things on the microcontroller, while the JavaScript console of your browser will be a useful tool for debugging things on the web page.

?> **📡 Do the microcontroller and web page need to be on the same network?** As the communication happens over the Internet, there's no problem in using different Wi-Fio or wired networks for the microcontroller and web page, as long as each network has access to the servers of shiftr.io.

## 5. Further Steps

Can you add new sensors or actuators? The reflexive obstacle sensor, for instance, has the exact same pins as the used vibration sensor, so it's possible to change between the two in the circuit without changing a single line of code. But what about other sensors with different connections? And how to publish and subscribe to topics? Pincello has meaningful documentation for each one of the actuators and sensors in the list of [recommended components](components.md), so you may want to go ahead and explore Pincello according to your interest and on your own rhythm. For help on how to publish and subscribe to new topics, there are two perspectives: JavaScript and microcontroller.

!> **🔌 Remember to unplug your microcontroller!** If you want to make changes in the circuit, first remember to turn off your microcontroller by pulling of the micro USB cable from the microcontroller or from the computer. If you change your circuit without powering it off on you will damage your components.

### 5.1. MQTT Topics: JavaScript

To subscribe to a new topic on the side of the web page, you will need to edit the `js/script.js` file. Line 48 shows how to subscribe to a topic. If you duplicate this line and change the first argument from `'/vibration'` to `'/proximity'`, you will now also subscribe to the `'/proximity'` topic.

```javascript
client.on('connect', function()
{
    console.log("MQTT Connected!");
    client.subscribe('/vibration', { qos: QoS });
    client.subscribe('/proximity', { qos: QoS }); //new subscription
});
```

But how do you make use of this subscription? Line 66 shows how to identify a topic when a new message is received. A new conditional statement would be needed to identify our new `'/proximity'` topic, and further conditional statements to decide what to do according to the content of the received message:

```javascript
client.on('message', function(topic, message)
{
    console.log('New message:', topic, message.toString());

    if (topic == "/vibration")
    {
        if (parseInt(message) == 1)
        {
            monalisa_element.classList.add("vibrating");
        }
        else
        {
            monalisa_element.classList.remove("vibrating");
        }
    }

    if (topic == "/proximity") //new subscribed topic
    {
        //fill in conditional statements for the message content
    }

});
```

Publishing to a topic is easier, you just need to call the `publishTopic` JavaScript function which has two parameters: the topic to publish to and the message. For instance, `publishTopic('/feedback', "this is my feedback");` would publish the message `"this is my feedback"` to the `'/feedback'` topic.

?> **↕️ Do I need to subscribe before publishing?** You do not need to be subscribed to a topic to publish to it.

### 5.1. MQTT Topics: Microcontroller

In the sketch, on the other hand, the subscription happens inside `setup`, as illustrated in lines 41, 42 and 43 of the provided sketch. If you duplicate one of these lines and change the first and only argument from `'/blue'` to `'/black'`, you will now also subscribe to the `'/black'` topic.

```arduino
void setup()
{
    Serial.begin(115200);

    pinMode(vibration_pin, INPUT);
    pinMode(red_pin, OUTPUT);
    pinMode(green_pin, OUTPUT);
    pinMode(blue_pin, OUTPUT);

    connectWIFI();
    client.begin("broker.shiftr.io", net);
    client.onMessage(messageReceived);
    connectMQTT();

    client.subscribe("/red");
    client.subscribe("/green");
    client.subscribe("/blue");
    client.subscribe("/black"); //new subscription
}
```

But how do you make use of this subscription? The handling of messages happens inside the `messageReceived` method, which may contain conditional statements according to the received topic and message. Lines 115, 120 and 125 show how to identify a topic when a new message is received. A new conditional statement would be needed to identify our new `'/black'` topic, and further commands or conditional statements to decide what to do according to the content of the received message:

```arduino
void messageReceived(String &topic, String &payload)
{
    Serial.println("New message: " + topic + " - " + payload);

    if (topic == "/red")
    {
        red = payload.toInt();
    }

    if (topic == "/green")
    {
        green = payload.toInt();
    }

    if (topic == "/blue")
    {
        blue = payload.toInt();
    }

    if (topic == "/black") //new subscribed topic
    {
        //fill commands or conditional statements for the message content
    }
}
```

To publish to a topic, you just need to call the `client.publish` function, as in lines 67 and 80. which has two parameters: the topic to publish to and the message. For instance, `client.publish("/color", "#FF0000", false, QoS);` would publish the message `"#FF0000"` to the `'/feedback'` topic.

?> **🏅 What is QoS?** It means Quality of Service, which defines the guarantees of delivering a message in MQTT. There are 3 QoS levels in MQTT: 0 (at most once), 1 (at least once) and 2 (exactly once). QoS 0 means that if the message is lost along the way, like in a packet loss, it will not be delivered. QoS 1 means that it will always be delivered at least once, but due to the same problems, it may be delivered more than once (duplicate). Lastly, QoS 3 means that the message will be delivered exactly once, at the expense of a longer response time.