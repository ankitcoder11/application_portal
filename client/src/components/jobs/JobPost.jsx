import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { createJob } from '../../api/jobs';
import Button from '../utiles/Button';

const InputField = ({ name, placeholder, onChange, onBlur, value, touched, errors }) => {
    return (
        <div className='relative'>
            <input className="p-2 border rounded w-full outline-none"
                type="text" name={name} placeholder={placeholder} onChange={onChange}
                onBlur={onBlur} value={value}
            />
            {touched && errors && (
                <div className="text-red-500 mt-1 text-[12px] absolute bottom-[-15px] ">{errors}</div>
            )}
        </div>
    )
}

const JobPost = () => {
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            title: '',
            skills: '',
            experience: '',
            location: '',
            image: '',
            type: 'Full-time',
            description: '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            location: Yup.string().required('Location is required'),
            type: Yup.string().oneOf(['Full-time', 'Part-time']).required('Job type is required'),
            description: Yup.string().required('Description is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            setLoading(true);
            try {
                const formData = new FormData();
                formData.append('title', values.title);
                formData.append('skills', values.skills);
                formData.append('experience', values.experience);
                formData.append('location', values.location);
                formData.append('image', values.image);
                formData.append('type', values.type);
                formData.append('description', values.description);

                const res = await createJob(formData);
                toast.success('Job posted successfully!');
                resetForm();
            } catch (err) {
                toast.error(err.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <div className='flex flex-col gap-[10px] '>
            <h1 className="text-[25px] font-bold ">Post a Job</h1>
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-[20px] ">
                <InputField name="title" placeholder="Job Title" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.title} touched={formik.touched.title} errors={formik.errors.title} />
                <InputField name="skills" placeholder="Skills" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.skills} />
                <InputField name="experience" placeholder="Experience" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.experience} />
                <InputField name="location" placeholder="Location" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.location} touched={formik.touched.location} errors={formik.errors.location} />
                <div className='relative'>
                    <input className="p-2 border rounded w-full outline-none"
                        type="file" name="image" accept="image/*"
                        onChange={(event) => {
                            formik.setFieldValue('image', event.currentTarget.files[0]);
                        }}
                    />
                </div>

                <div className='relative'>
                    <select className="p-2 border rounded w-full outline-none"
                        name="type" onChange={formik.handleChange}
                        onBlur={formik.handleBlur} value={formik.values.type}
                    >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                    </select>
                    {formik.touched.type && formik.errors.type && (
                        <div className="text-red-500 text-sm mt-1 text-[12px] absolute bottom-[-15px]">{formik.errors.type}</div>
                    )}
                </div>

                <div className='relative'>
                    <textarea className="p-2 border rounded w-full outline-none"
                        name="description" placeholder="Job Description"
                        rows="4" onChange={formik.handleChange}
                        onBlur={formik.handleBlur} value={formik.values.description}
                    />
                    {formik.touched.description && formik.errors.description && (
                        <div className="text-red-500 text-sm mt-1 text-[12px] absolute bottom-[-15px]">{formik.errors.description}</div>
                    )}
                </div>
                <div><Button onClick={formik.handleSubmit} isLoading={loading} text={'Post Job'} color={'white'} bg={'black'} /></div>
            </form>
        </div>
    );
};

export default JobPost;