import { cleanFullResponse } from "@/ipc/utils/cleanFullResponse";
import { describe, it, expect } from "vitest";

describe("cleanFullResponse", () => {
  it("should replace < characters in bl1nk-write attributes", () => {
    const input = `<bl1nk-write path="src/file.tsx" description="Testing <a> tags.">content</bl1nk-write>`;
    const expected = `<bl1nk-write path="src/file.tsx" description="Testing ＜a＞ tags.">content</bl1nk-write>`;

    const result = cleanFullResponse(input);
    expect(result).toBe(expected);
  });

  it("should replace < characters in multiple attributes", () => {
    const input = `<bl1nk-write path="src/<component>.tsx" description="Testing <div> tags.">content</bl1nk-write>`;
    const expected = `<bl1nk-write path="src/＜component＞.tsx" description="Testing ＜div＞ tags.">content</bl1nk-write>`;

    const result = cleanFullResponse(input);
    expect(result).toBe(expected);
  });

  it("should handle multiple nested HTML tags in a single attribute", () => {
    const input = `<bl1nk-write path="src/file.tsx" description="Testing <div> and <span> and <a> tags.">content</bl1nk-write>`;
    const expected = `<bl1nk-write path="src/file.tsx" description="Testing ＜div＞ and ＜span＞ and ＜a＞ tags.">content</bl1nk-write>`;

    const result = cleanFullResponse(input);
    expect(result).toBe(expected);
  });

  it("should handle complex example with mixed content", () => {
    const input = `
      BEFORE TAG
  <bl1nk-write path="src/pages/locations/neighborhoods/louisville/Highlands.tsx" description="Updating Highlands neighborhood page to use <a> tags.">
import React from 'react';
</bl1nk-write>
AFTER TAG
    `;

    const expected = `
      BEFORE TAG
  <bl1nk-write path="src/pages/locations/neighborhoods/louisville/Highlands.tsx" description="Updating Highlands neighborhood page to use ＜a＞ tags.">
import React from 'react';
</bl1nk-write>
AFTER TAG
    `;

    const result = cleanFullResponse(input);
    expect(result).toBe(expected);
  });

  it("should handle other bl1nk tag types", () => {
    const input = `<bl1nk-rename from="src/<old>.tsx" to="src/<new>.tsx"></bl1nk-rename>`;
    const expected = `<bl1nk-rename from="src/＜old＞.tsx" to="src/＜new＞.tsx"></bl1nk-rename>`;

    const result = cleanFullResponse(input);
    expect(result).toBe(expected);
  });

  it("should handle bl1nk-delete tags", () => {
    const input = `<bl1nk-delete path="src/<component>.tsx"></bl1nk-delete>`;
    const expected = `<bl1nk-delete path="src/＜component＞.tsx"></bl1nk-delete>`;

    const result = cleanFullResponse(input);
    expect(result).toBe(expected);
  });

  it("should not affect content outside bl1nk tags", () => {
    const input = `Some text with <regular> HTML tags. <bl1nk-write path="test.tsx" description="With <nested> tags.">content</bl1nk-write> More <html> here.`;
    const expected = `Some text with <regular> HTML tags. <bl1nk-write path="test.tsx" description="With ＜nested＞ tags.">content</bl1nk-write> More <html> here.`;

    const result = cleanFullResponse(input);
    expect(result).toBe(expected);
  });

  it("should handle empty attributes", () => {
    const input = `<bl1nk-write path="src/file.tsx">content</bl1nk-write>`;
    const expected = `<bl1nk-write path="src/file.tsx">content</bl1nk-write>`;

    const result = cleanFullResponse(input);
    expect(result).toBe(expected);
  });

  it("should handle attributes without < characters", () => {
    const input = `<bl1nk-write path="src/file.tsx" description="Normal description">content</bl1nk-write>`;
    const expected = `<bl1nk-write path="src/file.tsx" description="Normal description">content</bl1nk-write>`;

    const result = cleanFullResponse(input);
    expect(result).toBe(expected);
  });
});
