# Humidity and Temperature Sensor (DHT11)

Coming soon...

<!-- ![Demo DHT11](_images/circuit-dht11-teste.png)

!>**Important:** don't forget to use a 10KΩ resistor as illustrated.

O código abaixo realiza medições de temperatura e umidade relativa dor ar a cada dois segundos e imprime o resultado no Serial Monitor do Arduino IDE. Além de te dar as medições do ambiente, experimente assoprar levemente no sensor por alguns segundos para ver como os números são alterados.

?> **Biblioteca:** Outro detalhe é a necessidade de instalar a biblioteca DHT, para isso abra "Sketch > Include Library > Manage Libraries...", busque por "DHT" e instale a biblioteca "DHT sensor library by Adafruit".

```arduino
#include <DHT.h>
#define DHTPIN 5 //D1
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

void setup()
{
  Serial.begin(115200);
  dht.begin();
}

void loop()
{
  delay(2000); //Intervalo necessário entre medições

  float h = dht.readHumidity();
  float t = dht.readTemperature();
  
  if (isnan(h) || isnan(t))
  {
    Serial.println("Falha ao ler o sensor DHT11!");
    return;
  }

  Serial.print("Umidade: ");
  Serial.print(h, 0);
  Serial.print("%\t");
  Serial.print("Temperatura: ");
  Serial.print(t, 0);
  Serial.println("ºC");
}
``` -->