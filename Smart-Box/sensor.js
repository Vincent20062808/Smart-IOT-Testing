const mqtt = require("mqtt");

// Public broker
const BROKER_URL = "mqtt://broker.hivemq.com";

// Topic MQTT untuk Smart Box
const TOPIC = "Smart-box/Smart-box/package/data";

const client = mqtt.connect(BROKER_URL, {
  connectTimeout: 10_000,
  reconnectPeriod: 2_000,
});

client.on("connect", () => {
  console.log("✅ Ultrasonic Sensor connected to MQTT broker:", BROKER_URL);

  setInterval(() => {
    // Simulasi baca jarak HC-SR04 (misal: 2 cm - 100 cm)
    const distanceCm = Math.floor(Math.random() * 98) + 2; 

    // Status paket terdeteksi jika jarak kurang dari 15 cm
    const isPackageDetected = distanceCm < 15;

    const payload = {
      deviceId: "ultrasonic-001",
      distance_cm: distanceCm,
      packageDetected: isPackageDetected,
      timestamp: new Date().toISOString(),
    };

    client.publish(TOPIC, JSON.stringify(payload));
    console.log("📤 Sent payload:", payload);
  }, 2000);
});