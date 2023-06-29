import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Home from "./Home";

import { TestProvider } from "../context/testContext";
import Navbar from "../components/commons/Navbar";



describe("Given a Home component", () => {
  describe("When is rendered", () => {
    beforeEach(() => {
      render(
        <TestProvider>
          <BrowserRouter>
            <Navbar />
            <Home />
          </BrowserRouter>
        </TestProvider>
      );
    });

    test("Navbar component should be rendered", () => {
      expect(screen.getByText("Usuarios")).toBeDefined();
    });

    test("Button 'Añadir' should be rendered", () => {
      expect(screen.getByText("Añadir")).toBeDefined();
    });

    describe("When click a Button",()=>{

      test('form for add new users should be rendered',()=>{

        const ResizeObserverMock = vi.fn(() => ({
          observe: vi.fn(),
          unobserve: vi.fn(),
          disconnect: vi.fn()
        }))
        
        vi.stubGlobal('ResizeObserver', ResizeObserverMock)
        

        const button = screen.getByText("Añadir");

  
        fireEvent.click(button);
       
        expect(screen.getByText("Nuevo usuario")).toBeDefined();
      })
    })
  });
});
