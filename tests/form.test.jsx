import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Form from "../src/components/Form.jsx";

describe("Form test", () => {
	test("should render text", () => {
		// Renderiza el componente Form
		render(<Form></Form>);
		// Verifica que el texto "Identificador del Accidentado:" esté presente en el componente renderizado
		expect(screen.getByText(/Identificador del Accidentado:/i)).toBeDefined();
	});
});
