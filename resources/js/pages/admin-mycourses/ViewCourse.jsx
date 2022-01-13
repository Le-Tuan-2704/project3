import { useState, useEffect } from "react";
import { message } from "antd";
import API from '../../util/api';

export default function ViewCourse({courseId}){
    const [course, setCourse] = useState({
        id: 0,
        name: 'course name',
        code: 'course code',
        price: 0,
        description: 'course description',
    });
    useEffect( ()=>{
        API.get(`/course/${courseId}`)
        .then(function (res) {
            if(res.data.error_code){
                console.log(res.data);
                message.error("Request error: view detail in console");
                return;
            }
            setCourse(res.data.course);
        })
        .catch((error) => {
            message.error("Request error: view detail in console");
            console.log(error);
        });
    }, [courseId]);
    // var course = {
    //     id: 0,
    //     name: 'course name',
    //     code: 'course code',
    //     price: 0,
    //     description: 'course description',
    // };

    return (
        <div className="card bg-light p-4" style={{minHeight:'100%'}}>
			<div className="card-body">
				<div className="row">
					<div className="col-md-6">
                        <div className="border rounded p-1">
                            <img className="w-100" style={{minHeight:'400px'}} src={course.picture} />
                        </div>
					</div>
					<div className="col-md-6">
                        <h3 className="text-primary">{course.name}</h3>
                        <h4>Code: <span className="text-warning">{course.code}</span></h4>
                        <h4>Current price: <span className="text-warning">{course.price} đ</span></h4>
						<div>
							<button className="btn btn-warning btn-lg" type="button">BUY NOW</button>
						</div>
					</div>
				</div>
                <div className="row mt-4">
                    <div className="col-md-12">
                        <h4>Description</h4>
                        <div>{course.description}</div>
                    </div>
                </div>
			</div>
		</div>
    );
};