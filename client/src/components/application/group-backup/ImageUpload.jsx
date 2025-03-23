import React, { useContext } from "react";
import ImageUploading from "react-images-uploading";
import AddImage from "../../../assets/images/portfolio/add-image.png";
import { FiEdit, FiDelete } from "react-icons/fi";
import { GroupContext } from "./GroupInterface";

export function ImageUpload() {
  const context = useContext(GroupContext);

  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <div className="App">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <span
              style={isDragging ? { color: "red" } : undefined}
              onClick={onImageUpload}
              {...dragProps}
              className="group-image-add-span"
            >
              <img alt="this-img" src={AddImage} className="group-add-img" />
            </span>
            <span>
              <input
                type="text"
                className="group-add-input"
                placeholder="Name your group"
                onChange={context.handleChange}
              ></input>
            </span>
            &nbsp;
            {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image["data_url"]} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <span
                    onClick={() => onImageUpdate(index)}
                    className="group-edit"
                  >
                    <FiEdit />
                  </span>
                  <span
                    onClick={() => onImageRemove(index)}
                    className="group-del"
                  >
                    <FiDelete />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
