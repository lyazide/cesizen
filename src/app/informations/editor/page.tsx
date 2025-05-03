"use client";
import React, { useState } from "react";
import { Box, Textarea, VStack, Heading } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // To support GitHub-Flavored Markdown

function MarkdownEditor() {
  // State to manage the Markdown input
  const [markdown, setMarkdown] = useState("# Welcome to the Markdown Editor!");

  return (
    <VStack gap={6} align="stretch" p={6}>
      {/* Title */}
      <Heading as="h1" size="xl" textAlign="center">
        Markdown Editor with Chakra UI
      </Heading>

      {/* Input Textarea */}
      <Box>
        <Heading as="h3" size="md" mb={2}>
          Write Markdown
        </Heading>
        <Textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="Type your Markdown here..."
          size="lg"
          rows={10}
          borderColor="gray.300"
          _focus={{
            borderColor: "blue.400",
          }}
        />
      </Box>

      {/* Preview Section */}
      <Box>
        <Heading as="h3" size="md" mb={2}>
          Preview
        </Heading>
        {/* Aperçu du Markdown */}
        <Box p={4} borderWidth="1px" borderRadius="md" bg="gray.50">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <Heading as="h1" size="lg" mb={4}>
                  {children}
                </Heading>
              ),
              h2: ({ children }) => (
                <Heading as="h2" size="md" mb={3}>
                  {children}
                </Heading>
              ),
              ul: ({ children }) => (
                <Box as="ul" pl={6} style={{ listStyleType: "disc" }}>
                  {children}
                </Box>
              ),
              li: ({ children }) => (
                <Box as="li" mb={2}>
                  {children}
                </Box>
              ),
              p: ({ children }) => (
                <Box as="p" mb={4}>
                  {children}
                </Box>
              ),
            }}
          >
            {markdown}
          </ReactMarkdown>
        </Box>
      </Box>
    </VStack>
  );
}

export default MarkdownEditor;
