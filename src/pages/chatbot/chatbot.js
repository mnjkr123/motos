import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import styles from "./Chatbot.module.scss"; // Importing CSS Module
import Feature1 from "../../assets/images/1.png";

// Function to format the content into a structured bullet list
function formatContent(content) {
  if (!content) return "";

  // Remove any asterisks and add spacing after punctuation
  const cleanContent = content
    .replace(/\*\*/g, "")
    .replace(/([:;,.!?])\s*/g, "$1 ");
  const spacedContent = cleanContent.replace(/(\w)([A-Z])/g, "$1 $2");

  // Split into sections based on key phrases or formatting
  const sections = spacedContent
    .split(/(?<=\.)\s+/)
    .map((section) => section.trim());

  const formattedSections = sections.reduce((acc, section) => {
    const [title, ...points] = section.split(":").map((part) => part.trim());

    if (points.length) {
      const bulletPoints = points
        .join(":")
        .split(/(?<=\.)\s+/) // Split by sentences
        .map((point) => point.trim())
        .filter(Boolean);

      // Ensure that bullet points are added correctly
      const cleanedPoints = bulletPoints.map((point) =>
        point.replace(/(\*{1,2}|\s[*]{1,2}\s*)/g, "")
      );

      // Add section with bullets to the accumulator
      acc.push(
        `<h6>${title}</h6><ul>` +
          cleanedPoints.map((point) => `<li>${point}</li>`).join("") +
          "</ul>"
      );
    } else {
      // If there are no points, just add the title as a standalone item
      acc.push(`<h6>${title}</h6>`);
    }

    return acc;
  }, []);

  // Join all formatted sections into a single string
  return formattedSections.join("");
}

const Chatbot = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = { text: inputText, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

    if (!apiKey) {
      console.error("API key is not set");
      setMessages((prev) => [
        ...prev,
        { text: "API key is not set", isUser: false },
      ]);
      setIsLoading(false);
      return;
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
    const requestBody = {
      contents: [{ parts: [{ text: inputText }] }],
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.candidates && data.candidates[0]) {
        const botMessageRaw =
          data.candidates[0].content.parts[0].text || "No response received.";
        const formattedBotMessage = formatContent(botMessageRaw);
        setMessages((prev) => [
          ...prev,
          { text: formattedBotMessage, isUser: false },
        ]);
      } else {
        throw new Error("Unexpected API response structure");
      }
    } catch (error) {
      console.error("Caught error:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: `Error: ${error.message}. Please try again.`,
          isUser: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={`section pb-4 pb-sm-6 pt-6 ${styles.chatbotSection}`}>
      <Container fluid style={{ padding: "0 20px" }}>
        <Row className="justify-content-center">
          {/* Left Column for the Image */}
          <Col
            lg={4}
            className="d-flex align-items-center justify-content-center"
          >
            <img
              src={Feature1}
              alt="Feature Description"
              style={{
                width: "auto",
                height: "auto",
                maxWidth: "100%", // Ensure it doesn't overflow
                maxHeight: "500px", // Set a max height to keep it contained
                objectFit: "contain", // Maintain aspect ratio
              }}
            />
          </Col>
          {/* Right Column for Chatbox */}
          <Col lg={6}>
            <Card className={styles.chatbotCard}>
              <Card.Header className={styles.chatbotHeader}>
                <h4 className="fw-medium text-white">Chat with Us</h4>
              </Card.Header>
              <Card.Body>
                <div
                  className={styles.messages}
                  style={{
                    maxHeight: "600px",
                    overflowY: "auto",
                    padding: "10px",
                    marginBottom: "10px",
                  }}
                >
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`${styles.message} ${
                        msg.isUser ? styles.user : styles.bot
                      }`}
                    >
                      <span
                        dangerouslySetInnerHTML={{ __html: msg.text }}
                      ></span>
                    </div>
                  ))}
                </div>

                <Form onSubmit={handleSubmit} className={styles.userInputForm}>
                  <Row className="align-items-center">
                    <Col lg={10}>
                      <Form.Control
                        type="text"
                        placeholder="Type your message..."
                        value={inputText}
                        onChange={handleInputChange}
                        disabled={isLoading}
                      />
                    </Col>
                    <Col lg={2} className="text-end">
                      <Button
                        type="submit"
                        className={styles.sendBtn}
                        disabled={isLoading}
                      >
                        {isLoading ? "Sending..." : "Send"}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Chatbot;
