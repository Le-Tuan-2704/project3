//import {useState} from 'react';
import { Modal, message } from 'antd';
import './style.css';
import API from '../../util/api';

export default function App({ addCourse, isAddCourseModalVisible, setIsAddCourseModalVisible }){
    var choosedFile = null;
    const handleOk = () => {
        setIsAddCourseModalVisible(false);
        addCourse();
    };

    const handleCancel = () => {
        setIsAddCourseModalVisible(false);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        let data = event.target.elements;
        const formData = new FormData();
        if(!choosedFile){
            message.error("Course picture is required");
            return false;
        }
        formData.append('image', choosedFile, choosedFile.name);
        formData.append('code', data.code.value);
        formData.append('name', data.name.value);
        formData.append('price', data.price.value);
        formData.append('description', data.description.value);
        API.post('/course',formData)
        .then((res)=>{
            if(res.data.error_code){
                message.error('view detail error in console');
                console.log(res.data);
                return;
            }
            let course = {
                id: res.data.course.id,
                name: res.data.course.name,
            };
            addCourse(course);
            message.success("Add course successfully");
            setIsAddCourseModalVisible(false);
        }).catch((err)=>{
            message.error('View detai error in console');
            console.log(err);
        })
    }

    const changeFile = (event) => {
        let input = event.target;
        if (input.files && input.files[0]) {
            choosedFile = input.files[0];
            const reader = new FileReader();

            reader.onload = function (e) {
                document.getElementById('imageView').setAttribute('src',`${e.target.result}`);
                // setImageSource('url(' + e.target.result + ')');
            }
            reader.readAsDataURL(input.files[0]);
        }else{
            choosedFile = null;
            document.getElementById('imageView').removeAttribute('src');
            // setImageSource('');
        }
    }

    const onClickFileUpload = () => {
        document.getElementById('fileInput').click();
    }

  return (
    <>
        <Modal
            title={<span><i className="fa fa-book" /> Add course</span>}
            onCancel={handleCancel}
            footer={null}
            visible={isAddCourseModalVisible}
            zIndex={5}
            width={600} >
            <form className="row" onSubmit={onSubmit}>
                <div className="col-xl-6 col-lg-6 col-md-12">
                    <div className="form-group mb-3">
                        <label htmlFor="course-code">Code</label>
                        <input id="course-code" name="code" type="text" className="form-control validate" required />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="course-name">Name</label>
                        <input id="course-name" name="name" type="text" className="form-control validate" required />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="course-price">Price</label>
                        <input id="course-price" name="price" type="number" min="1" className="form-control validate" required />
                    </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12">
                    <div className="border rounded p-1 bg-info">
                        <img className="w-100" id="imageView" style={{minHeight:'200px'}} />
                    </div>
                    <div className="custom-file mt-3 mb-3">
                        <input id="fileInput" type="file" accept=".gif,.jpg,.jpeg,.png" style={{display:'none'}} onChange={changeFile} />
                        <input type="button" className="btn btn-primary btn-block" value="UPLOAD COURSE IMAGE" onClick={onClickFileUpload} />
                    </div>
                </div>
                <div className="col-12">
                    <div className="mb-4">
                        <label htmlFor="course-description">Description</label>
                        <textarea id="course-description" name="description" className="form-control validate" rows="3" required></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block text-uppercase">Add Product Now</button>
                </div>
            </form>
        </Modal>
    </>
  );
};