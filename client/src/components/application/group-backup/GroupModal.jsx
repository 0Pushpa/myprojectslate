import React, { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { FiSearch } from "react-icons/fi";
import { IoIosAdd } from "react-icons/io";
import Navbarimg from "../../../assets/images/portfolio/navimg.jpg";
import Contactimg from "../../../assets/images/portfolio/contactimg.jpg";
import Contactimg1 from "../../../assets/images/portfolio/conatctimg1.jpg";
import { ImageUpload } from "./ImageUpload";
import { GroupContext } from "./GroupInterface"; //uta ko context import gareko to use//

function GroupModal(props) {
  const context = useContext(GroupContext);
  return (
    <>
      <div>
        <Modal
          show={context.show}
          onHide={context.handleClose}
          className="contact-add-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Create a group</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="name-your-group">
              <span className="group-photo-add">
                <ImageUpload />
              </span>
            </div>
            <div class="search-container">
              <input
                type="text"
                name="search"
                placeholder="Search contacts"
                className="contact-modal-input"
              />

              <span className="search-i">
                <FiSearch />
              </span>
            </div>
            <div className="contact-modal-list">
              <ul>
                <li>
                  <div className="contact-modal-flex">
                    <div className="contact-modal-flex1">
                      <span className="contact-modal-flex-user">
                        <img alt="my-img" src={Navbarimg} />
                      </span>
                    </div>
                    <div className="contact-modal-flex2">
                      <h3 className="contact-modal-flex2-h3">
                        Ram Kumar Sapkota
                      </h3>
                    </div>
                    <div className="contact-modal-flex3">
                      <span className="contact-modal-flexaddicon">
                        <IoIosAdd />
                      </span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="contact-modal-flex">
                    <div className="contact-modal-flex1">
                      <span className="contact-modal-flex-user">
                        <img alt="my-img" src={Contactimg} />
                      </span>
                    </div>
                    <div className="contact-modal-flex2">
                      <h3 className="contact-modal-flex2-h3">
                        Aman Kumar Gupta
                      </h3>
                    </div>
                    <div className="contact-modal-flex3">
                      <span className="contact-modal-flexaddicon">
                        <IoIosAdd />
                      </span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="contact-modal-flex">
                    <div className="contact-modal-flex1">
                      <span className="contact-modal-flex-user">
                        <img alt="my-img" src={Contactimg1} />
                      </span>
                    </div>
                    <div className="contact-modal-flex2">
                      <h3 className="contact-modal-flex2-h3">
                        Upu Adhikari Subod
                      </h3>
                    </div>
                    <div className="contact-modal-flex3">
                      <span className="contact-modal-flexaddicon">
                        <IoIosAdd />
                      </span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="contact-modal-flex">
                    <div className="contact-modal-flex1">
                      <span className="contact-modal-flex-user">
                        <img alt="my-img" src={Navbarimg} />
                      </span>
                    </div>
                    <div className="contact-modal-flex2">
                      <h3 className="contact-modal-flex2-h3">
                        Kilesh Bahadur Rajbhandari
                      </h3>
                    </div>
                    <div className="contact-modal-flex3">
                      <span className="contact-modal-flexaddicon">
                        <IoIosAdd />
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="info" onClick={context.addGroup}>
              Done
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default GroupModal;
