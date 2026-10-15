const mqtt = require("mqtt");

const BROKER_URL = "mqtt://broker.hivemq.com";

const TOPIC = "smart-box/package/data";
const client = mqtt.connect(BROKER_URL, {
  connectTimeout: 10_000,
  reconnectPeriod: 2_000,
});

client.on("connect", () => {
  console.log("✅ Subscriber connected:", BROKER_URL);

  client.subscribe(TOPIC, (err) => {
    if (err) {
      console.error("❌ Subscribe error:", err.message);
    } else {
      console.log("💡 Listening on topic:", TOPIC);
    }
  });
});

client.on("message", (topic, message) => {
  
  try {
    const data = JSON.parse(message.toString());
    console.log("📥 Received Package Data:", data);
    console.log(`➡️ Jarak: ${data.distance_cm} cm | Ada Paket?: ${data.packageDetected ? "YA" : "TIDAK"}`);
  } catch (e) {
    // Kalau formatnya bukan JSON, tampilkan biasa
    console.log("📥 Received (Raw):", message.toString());
  }
});

client.on("error", (err) => console.error("❌ MQTT error:", err.message));