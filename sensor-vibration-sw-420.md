# Vibration Sensor (SW-420)

Comming soon...

<!-- ![Demo SW-420](_images/demo-sw-420.png)

O seguinte código monitora a saída do sensor e imprime uma mensagem no Serial Monitor do Arduino IDE sempre que uma vibração é detectada (lembre-se, você pode ajustar a sensibilidade do sensor girando com cuidado o potenciômetro presente no mesmo). Experimente pegar ou chacoalhar a protoboard levemente para ver o tipo de movimento que o sensor captura. Note que o código e o circuito são praticamente idênticos aos do sensor de obstáculo, pois ambos possuem os mesmos pinos e o mesmo tipo de saída.

```arduino
const int vibration_pin = D0;
int vibration;

void setup()
{
  Serial.begin(115200);
}

void loop()
{
  vibration = digitalRead(vibration_pin);
  if (vibration == HIGH)
  {
    Serial.println("Vibração detectada!");
  }
}
``` -->