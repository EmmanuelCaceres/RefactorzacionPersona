// Importamos el tipo de dato IPersona y la clase BackendClient
import { InterfacePersona } from "../types/InterfacePersona";
import {GenericFetch} from "./GenericFetch";

// Clase PersonaService que extiende BackendClient para interactuar con la API de personas
export class Persona extends GenericFetch<InterfacePersona> {}