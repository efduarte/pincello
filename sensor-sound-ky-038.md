# Sound Sensor (KY-038)

Comming soon...

<!-- ![Demo SW-420](img/demo-ky-038.png)

**Importante!** Embora o sensor possua saídas analógica e digital, você não precisa usar as duas ao mesmo tempo, é possível, por exemplo, usar apenas a saída digital ou apenas a saída analógica (recomendo utilizar a digital, pois possui uma saída mais fácil de trabalhar e não ocupa a única entrada analógica que temos).

O código abaixo lê os valores detectados tanto para a saída analógica quanto a saída digital do sensor e imprime esses valores no Serial Monitor do Arduino IDE. Como a medição é muito rápida, adicionei um pequeno delay de um segundo quando a saída digital está ativa, assim ela não passa despercebida. Experimente bater palmas, assoviar ou até mesmo assoprar no microfone do sensor para ver como as saídas se comportam (lembre-se, você pode ajustar a sensibilidade do sensor girando com cuidado o potenciômetro presente no mesmo, recomendo fortemente fazer isso com o Serial Monitor aberto para ver a alteração em tempo real, pois ela pode ser bastante sutil).

```arduino
int soundDigital;
int soundAnalogic;

void setup()
{
  Serial.begin(115200);
}

void loop()
{
  soundDigital = digitalRead(16); //D0
  soundAnalogic = analogRead(A0);
  Serial.print("Som Digital: ");
  Serial.print(soundDigital);
  Serial.print("\t");
  Serial.print("Som Analógico: ");
  Serial.println(soundAnalogic);

  if (soundDigital == HIGH)
  {
    delay(1000);
  }
}
``` -->