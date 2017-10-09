# Luminosity Sensor (LDR)

Comming soon...

<!-- ![Demo LDR](img/demo-ldr.png)

!> **Importante:** não se esqueça de conectar um resistor de 10KΩ conforme ilustrado no diagrama.

?> **Tipo de Entrada:** Note que esse sensor necessita de uma entrada analógica.

O código abaixo mede a luminosidade captada pelo sensor LDR e imprime o valor em tempo real no Serial Monitor do Arduino IDE (note que o valor fica entre 0 e 1023). Experimente tampar o sensor com a sua mão, ou então apontar a lanterna do seu celular para ele para ver como a medição é alterada.

```arduino
int luminosity;

void setup()
{
  Serial.begin(115200);
}

void loop()
{
  luminosity = analogRead(A0);
  Serial.print("Luminosidade (0-1023): ");
  Serial.println(luminosity);
}
``` -->