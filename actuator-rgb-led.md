# RGB LED

Coming soon...

<!-- ![Demo LED RGB](img/demo-led-rgb.png)

!>**Importante!** Cada pino de cor do LED RGB precisa de um resistor individual de 330Ω, conforme ilustrado.

?>**Dica:** Existem dois tipos de LEDs RGB, cátodo ou ânodo comum. É muito fácil confundir entre os dois

O seguinte código utiliza a função `setColor` para trocar a cor do LED RGB a cada segundo. Experimente definir suas próprias cores, apenas lembre-se de usar valores entre 0 e 255 para cada um dos parâmetros da função.

```arduino
const int red_pin = D5;
const int green_pin = D6;
const int blue_pin = D7;

void setup()
{
  pinMode(red_pin, OUTPUT);
  pinMode(green_pin, OUTPUT);
  pinMode(blue_pin, OUTPUT);
}

void loop()
{
  setColor(255, 0, 0);  // red
  delay(1000);
  setColor(0, 255, 0);  // green
  delay(1000);
  setColor(0, 0, 255);  // blue
  delay(1000);
  setColor(255, 255, 0);  // yellow
  delay(1000);  
  setColor(80, 0, 80);  // purple
  delay(1000);
  setColor(0, 255, 255);  // aqua
  delay(1000);
}

void setColor(int red, int green, int blue)
{
  red = map(red, 0, 255, 0, 1023);
  green = map(green, 0, 255, 0, 1023);
  blue = map(blue, 0, 255, 0, 1023);
  analogWrite(red_pin, red);
  analogWrite(green_pin, green);
  analogWrite(blue_pin, blue);
}
``` -->