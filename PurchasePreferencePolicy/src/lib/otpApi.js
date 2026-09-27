const OTP_API_BASE = (import.meta.env.VITE_OTP_API_BASE || "https://startup.bihar.gov.in/newapi").replace(/\/$/, "");

const otpError = (code, message, cause) => Object.assign(new Error(message), { code, cause });

const normalizeMobile = (mobile) => {
  const phone = String(mobile || "").replace(/\D/g, "").slice(-10);
  if (!/^[6-9]\d{9}$/.test(phone)) {
    throw otpError("otp/invalid-mobile", "Enter a valid 10-digit mobile number");
  }
  return phone;
};

async function otpRequest(endpoint, body) {
  let response;
  try {
    response = await fetch(`${OTP_API_BASE}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (cause) {
    throw otpError("otp/network", "Unable to reach the OTP service", cause);
  }

  let data;
  try {
    data = await response.json();
  } catch (cause) {
    throw otpError("otp/unexpected", "The OTP service returned an invalid response", cause);
  }

  if (!response.ok || !data?.success) {
    const code = response.status === 429 ? "otp/too-many" : endpoint.includes("verify") ? "otp/invalid" : "otp/send-failed";
    throw otpError(code, data?.message || "OTP request failed");
  }

  return data;
}

export function sendOtp(mobile) {
  return otpRequest("/otp-auth/send-otp", { mobile: normalizeMobile(mobile) });
}

export function verifyOtp(mobile, otp) {
  const phone = normalizeMobile(mobile);
  const code = String(otp || "").replace(/\D/g, "");
  if (code.length !== 6) {
    throw otpError("otp/invalid", "Enter a valid 6-digit OTP");
  }
  return otpRequest("/otp-auth/verify-otp", { mobile: phone, otp: code });
}
