# Push Button

Comming soon...

<!-- ![Demo Button](img/demo-button.png)

!>**Importante!** O resistor utilizado é de 10KΩ, não confundir com o outro que é utilizado em LEDs.

O código abaixo captura os eventos de pressionar e soltar um botão e imprime o que ocorreu no serial monitor do Arduino. Experimente apertar o botão algumas vezes para ver os eventos que são capturados. Note que o pequeno delay de 100 milisegundos é necessário para evitar um pequeno problema físico que pode fazer com que o botão registre várias vezes um mesmo evento.

```arduino
int buttonPin = 16;
int buttonStatus = 0;

void setup()
{
  Serial.begin(115200);
  pinMode(buttonPin, INPUT); //D0
}

void loop()
{
  if(digitalRead(buttonPin) == HIGH && buttonStatus == 0)
  {
    Serial.println("Botão pressionado!");
    buttonStatus = 1;
    delay(100);
  }

  if(digitalRead(buttonPin) == LOW && buttonStatus == 1)
  {
    Serial.println("Botão solto!");
    buttonStatus = 0;
    delay(100);
  }
}
```

# Push Button Caps -->