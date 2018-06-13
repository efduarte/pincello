# Buzzer

The buzzer is a simple piezoelectric device that allow us to easily create beeping sounds 🔊. It is very limited in terms of sound range, and sometimes can be very annoying 😡, but may also be very fun with some creativity and work.

![Buzzer Circuit](_images/actuator-buzzer.png)

?>**🤔 Correct side?** buzzers are polarized, which means one of their connectors is the positive side, and the other is negative. To identify polarity, take notice that the longest pin is usually the positive one, and usually there is also a plus sign on the buzzer casing on the same side as the positive pin.

The following code turns the buzzer on for one second (1000 milliseconds), turns it off for another second, and then this loop is repeated indefinitely. The code itself is straightforward and does not need any library for it to work.

```arduino
const int buzzer_pin = D0;

void setup()
{
    pinMode(buzzer_pin, OUTPUT);
}

void loop()
{
    digitalWrite(buzzer_pin, HIGH);
    delay(1000);
    digitalWrite(buzzer_pin, LOW);
    delay(1000);
}
```

## A Less Annoying Code Example

You can make use of the [`tone()`](https://www.arduino.cc/reference/en/language/functions/advanced-io/tone/) function to produce less annoying sounds with the buzzer. The following code, for instance, sequentially produces a series of frequencies in a loop. However, do keep in mind that the use of delays to make a composition will lock your code execution during the delay (the microcontroller executes code sequentially), so other sensors and actuators will not work as expected during that time.

```arduino
const int buzzer_pin = D0;

int tones[] = {261, 277, 294, 311, 330, 349, 370, 392, 415, 440}; //Frequencies in Hertz

void setup()
{
    pinMode(buzzer_pin, OUTPUT);
}

void loop()
{
    for (int i = 0; i < 10; i++)
    {
        tone(buzzer_pin, tones[i]);
        delay(500);
    }
    noTone(buzzer_pin);
}
```