// Importación de las dependencias necesarias
import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import TextFieldValue from "../TextFildValue/TextFildValue";
import { Persona } from "../../services/PersonaFetch";
import { InterfacePersona } from "../../types/InterfacePersona";
// import { postData, putData } from "../../services/GenericFetch";

// Definición de las propiedades que recibe el componente
interface props {
  showModal: boolean;
  handleClose: () => void;
  editing?: boolean;
  persona?: InterfacePersona;
  getPersonas: Function;
}

// Definición del componente ModalFormulario
export const ModalFormulario = ({
  showModal,
  handleClose,
  editing,
  persona,
  getPersonas,
}: props) => {
  // Valores iniciales para el formulario
  const initialValues: InterfacePersona = {
    phoneNumber: "",
    adress: "",
    birthdate: "" as any,
    email: "",
    firstName: "",
    lastName: "",
  };
  const personaClass = new Persona();
  // URL de la API obtenida desde las variables de entorno
  const urlapi = import.meta.env.VITE_API_URL;

  const actualDate: string = new Date().toISOString().split("T")[0]

  // Renderizado del componente ModalFormulario
  return (
    <div>
      <Modal
        id={"modal"}
        show={showModal}
        onHide={handleClose}
        size={"lg"}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          {editing ? (
            <Modal.Title>Editar una persona:</Modal.Title>
          ) : (
            <Modal.Title>Añadir una persona:</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={
              Yup.object({
                phoneNumber: Yup.string().required("Campo requerido"),
                adress: Yup.string().required("Campo requerido"),
                birthdate: Yup.date().required("Campo requerido").max(actualDate, 'La fecha no puede ser mayor a la fecha actual'),
                email: Yup.string().email("Tiene que ser un correo electrónico válido").required("Campo requerido"),
                firstName: Yup.string().required("Campo requerido"),
                lastName: Yup.string().required("Campo requerido")
              })
            }
            initialValues={persona ? persona : initialValues}
            enableReinitialize={true}
            onSubmit={async (values) => {

              if (editing) {
                await personaClass.putData<InterfacePersona>(
                  urlapi + `api/personas/${persona?.id}`,
                  values
                );
              } else {
                await personaClass.postData<InterfacePersona>(
                  urlapi + "api/personas",
                  values
                );
              }
              getPersonas();
              handleClose();
            }}
          >
            {() => (
              <>
                <Form autoComplete="off" className="form-obraAlta">
                  <div className="container_Form_Ingredientes">
                    <TextFieldValue
                      label="Nombre:"
                      name="firstName"
                      type="text"
                      placeholder="Nombre"
                    />
                    <TextFieldValue
                      label="Apellido:"
                      name="lastName"
                      type="text"
                      placeholder="Apellido"
                    />

                    <TextFieldValue
                      label="Correo electrónico:"
                      name="email"
                      type="text"
                      placeholder="Mail"
                    />

                    <TextFieldValue
                      label="Dirección:"
                      name="adress"
                      type="text"
                      placeholder="Direccion"
                    />
                    <TextFieldValue
                      label="Número de teléfono:"
                      name="phoneNumber"
                      type="number"
                      placeholder="Numero de telefono"
                    />
                    <TextFieldValue
                      label="Fecha de nacimiento:"
                      name="birthdate"
                      type="date"
                      placeholder="Fecha de nacimiento"
                    />
                  </div>
                  <div className="d-flex justify-content-end">
                    <Button variant="success" type="submit">
                      Enviar
                    </Button>
                  </div>
                </Form>
              </>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div >
  )
}
