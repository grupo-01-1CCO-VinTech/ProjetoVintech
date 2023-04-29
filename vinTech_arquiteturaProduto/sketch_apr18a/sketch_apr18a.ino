#include <DHT.h>
#include <DHT_U.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>
#include "DHT.h"
#define DHTPIN A1
DHT dht(DHTPIN, DHT11);
void setup()
{
  Serial.begin(9600);
  dht.begin();
}
void loop()
{
float dht11_umidade = dht.readHumidity();
float dht11_temperatura = dht.readTemperature();
Serial.print(dht11_umidade);
Serial.print(";");
Serial.print(dht11_temperatura);
Serial.print(";");
Serial.println();
}
