import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AppInput from "./AppInput";

describe("AppInput", () => {
  it("should render", () => {
    const { container } = render(<AppInput name="test" placeholder="test" />);
    expect(container.firstChild).toMatchInlineSnapshot(`
      <input
        class="px-2 text-sm mt-1 block w-full py-1 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-gray-700 transition-all duration-100 "
        name="test"
        placeholder="test"
      />
    `);
  });
});
