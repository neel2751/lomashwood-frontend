// Test API call
import { api } from "@/lib/axios";

console.log("Testing API call...");

api.get('/products?category=kitchen&featured=true&limit=8')
  .then(response => {
    console.log("API Response:", response.data);
  })
  .catch(error => {
    console.error("API Error:", error);
  });
