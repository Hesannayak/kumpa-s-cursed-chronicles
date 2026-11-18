import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Nav } from "@/components/kumpa/sections";

describe("Header World link", () => {
  it("enters the open world when clicked", () => {
    const onWorld = vi.fn();
    render(<Nav onWorld={onWorld} />);

    const link = screen.getByRole("link", { name: /world/i });
    expect(link).toHaveAttribute("href", "/");

    const click = fireEvent.click(link);
    // fireEvent returns false when preventDefault ran: the page must not reload.
    expect(click).toBe(false);
    expect(onWorld).toHaveBeenCalledTimes(1);
  });

  it("stays a plain link to the world when no handler is given", () => {
    render(<Nav />);
    const link = screen.getByRole("link", { name: /world/i });
    expect(link).toHaveAttribute("href", "/");
    expect(fireEvent.click(link)).toBe(true);
  });
});
