import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Formulario from "../src/components/Form.jsx";
import App from "../src/App.jsx";

describe("Form test", () => {
	test("should render App", () => {
		// Renderiza el componente Form
		render(<App></App>);
		// Verifica que el texto "Identificador del Accidentado:" esté presente en el componente renderizado
		expect(screen.getByText(/WarMedAI/i)).toBeDefined();
		expect(screen.getByRole('button', { name: /change color theme/i })).toBeDefined();
	});

	test("should render Form", () => {
		// Renderiza el componente Form
		render(<Formulario></Formulario>);
		// Verifica que el texto "Identificador del Accidentado:" esté presente en el componente renderizado
		expect(screen.getByText(/Identificador del Accidentado:/i)).toBeDefined();
		// Verifica que algunos elementos específicos estén presentes
		expect(screen.getByText(/Identificador del Accidentado:/i)).toBeDefined();
		expect(screen.getByText(/Respira\?/i)).toBeDefined();
		expect(screen.getByText(/Está consciente\?/i)).toBeDefined();
		expect(screen.getByText(/Situación:/i)).toBeDefined();
		expect(screen.getByText(/API Key OpenAI:/i)).toBeDefined();
		expect(screen.getByRole('button', { name: /Enviar/i })).toBeDefined();
	});
});
