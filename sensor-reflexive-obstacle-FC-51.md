# Reflexive Obstacle Sensor (FC-51)

Coming soon...

<!-- ![Demo SW-420](img/demo-fc-51.png)

O seguinte código monitora a saída do sensor e imprime uma mensagem no Serial Monitor do Arduino IDE sempre que um obstáculo é detectado (lembre-se, você pode ajustar a sensibilidade do sensor girando com cuidado o potenciômetro presente no mesmo, de acordo com a especificação do sensor esse ajuste muda a distância de detecção para um valor entre 2 e 80cm). Experimente colocar algum obstáculo (pode ser sua mão) na frente dos LEDs e aproximar ou afastar esse obstáculo para ver como a detecção ocorre.

```arduino
int obstacle;

void setup()
{
  Serial.begin(115200);
}

void loop()
{
  obstacle = digitalRead(16); //D0
  if (obstacle == HIGH)
  {
    Serial.println("Obstáculo detectado!");
  }
}
``` -->