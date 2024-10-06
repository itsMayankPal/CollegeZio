import React from "react";
import { Box, Typography, Container } from "@mui/material";

export default function Privacy() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: 4,
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{ marginBottom: 3, color: "#1F1F1F", fontWeight: "700" }}
      >
        Privacy Policy for CollegeZio
      </Typography>
      <Typography
        variant="body1"
        align="center"
        sx={{ marginBottom: 4, color: "#555", fontSize: "1.1rem" }}
      >
        Your privacy is our priority. This document outlines our practices
        regarding the collection, use, and sharing of your information.
      </Typography>

      <Box sx={{ marginBottom: 4 }}>
        <Typography
          variant="h5"
          sx={{
            color: "#F4B400",
            fontWeight: "600",
            borderBottom: "2px solid #F4B400",
            paddingBottom: 1,
          }}
        >
          Information We Collect
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          We collect information in various ways, including:
        </Typography>
        <Typography
          variant="body1"
          component="ul"
          sx={{ listStyle: "none", paddingLeft: 0, marginTop: 1 }}
        >
          <li>
            • Personal Information: Name, email address, phone number, etc.
          </li>
          <li>• Non-Personal Information: Browser type, IP address, etc.</li>
        </Typography>
      </Box>

      <Box sx={{ marginBottom: 4 }}>
        <Typography
          variant="h5"
          sx={{
            color: "#F4B400",
            fontWeight: "600",
            borderBottom: "2px solid #F4B400",
            paddingBottom: 1,
          }}
        >
          How We Use Your Information
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          Your information helps us to:
        </Typography>
        <Typography
          variant="body1"
          component="ul"
          sx={{ listStyle: "none", paddingLeft: 0, marginTop: 1 }}
        >
          <li>• Improve customer service and user experience.</li>
          <li>• Send periodic emails with updates and offers.</li>
        </Typography>
      </Box>

      <Box sx={{ marginBottom: 4 }}>
        <Typography
          variant="h5"
          sx={{
            color: "#F4B400",
            fontWeight: "600",
            borderBottom: "2px solid #F4B400",
            paddingBottom: 1,
          }}
        >
          Data Sharing
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          We do not sell or trade your Personally Identifiable Information. We
          may share your data only with trusted partners who adhere to strict
          confidentiality agreements.
        </Typography>
      </Box>

      <Box sx={{ marginBottom: 4 }}>
        <Typography
          variant="h5"
          sx={{
            color: "#F4B400",
            fontWeight: "600",
            borderBottom: "2px solid #F4B400",
            paddingBottom: 1,
          }}
        >
          Cookies
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          Our website uses cookies to enhance user experience. You can choose to
          accept or decline cookies. However, this may prevent you from taking
          full advantage of the website.
        </Typography>
      </Box>

      <Box sx={{ marginBottom: 4 }}>
        <Typography
          variant="h5"
          sx={{
            color: "#F4B400",
            fontWeight: "600",
            borderBottom: "2px solid #F4B400",
            paddingBottom: 1,
          }}
        >
          Data Security
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          We take appropriate security measures to protect your data from
          unauthorized access, disclosure, alteration, and destruction.
        </Typography>
      </Box>

      <Box sx={{ marginBottom: 4 }}>
        <Typography
          variant="h5"
          sx={{
            color: "#F4B400",
            fontWeight: "600",
            borderBottom: "2px solid #F4B400",
            paddingBottom: 1,
          }}
        >
          Your Rights
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          You have the right to request access to your personal data and to
          request correction or deletion of your data.
        </Typography>
      </Box>

      <Box sx={{ marginBottom: 4 }}>
        <Typography
          variant="h5"
          sx={{
            color: "#F4B400",
            fontWeight: "600",
            borderBottom: "2px solid #F4B400",
            paddingBottom: 1,
          }}
        >
          Contact Us
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          For any questions regarding this Privacy Policy, please contact us at:
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 1 }}>
          Email:{" "}
          <a href="mailto:itspalmayank@gmail.com" style={{ color: "#F4B400" }}>
            itspalmayank@gmail.com
          </a>
        </Typography>
      </Box>

      <Box sx={{ marginBottom: 4 }}>
        <Typography
          variant="h5"
          sx={{
            color: "#F4B400",
            fontWeight: "600",
            borderBottom: "2px solid #F4B400",
            paddingBottom: 1,
          }}
        >
          Changes to This Policy
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          We may update this policy from time to time. We encourage users to
          review this page periodically for changes.
        </Typography>
      </Box>
    </Container>
  );
}
