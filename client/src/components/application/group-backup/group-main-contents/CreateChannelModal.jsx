import React from "react";
import { Button, Modal } from "react-bootstrap";
import { FiSearch } from "react-icons/fi";
import { IoIosAdd } from "react-icons/io";
import Contactimg1 from "../../../../assets/images/portfolio/conatctimg1.jpg";
import Contactimg from "../../../../assets/images/portfolio/contactimg.jpg";
import Navbarimg from "../../../../assets/images/portfolio/navimg.jpg";

function CreateChannelModal(props) {
  return (
    <>
      <div>
        <Modal
          show={props.show}
          onHide={props.showModal}
          className="contact-add-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Create channel
              <h3 className="create-channel-modelh3">
                Channels are meant for enhanced collabration in your group
              </h3>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="channel-modalnaming">
              <h3 className="c-c-channelname-h3">Channel Name:</h3>
            </div>
            <div className="channel-model-checkbox">
              <h3>Visibility:</h3>
            </div>
            <div className="channel-model-addmem">
              <h3>Add members :</h3>
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
                        <img src={Navbarimg} alt="abc" />
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
                        <img src={Contactimg} alt="abc" />
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
                        <img src={Contactimg1} alt="abc" />
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
                        <img src={Navbarimg} alt="abc" />
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
            <Button variant="info">Done</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default CreateChannelModal;
