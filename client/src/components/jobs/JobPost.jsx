import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { createJob } from '../../api/jobs';
import Button from '../utiles/Button';

const InputField = ({ name, placeholder, onChange, onBlur, value, touched, errors }) => (
    <div className="relative">
        <input
            className="p-2 border rounded w-full outline-none"
            type="text"
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
        />
        {touched && errors && (
            <div className="text-red-500 mt-1 text-[12px] absolute bottom-[-15px]">{errors}</div>
        )}
    </div>
);

const DynamicListInput = ({ label, items, setItems, placeholder }) => {
    const [input, setInput] = useState('');

    const handleAdd = () => {
        if (input.trim()) {
            setItems([...items, input.trim()]);
            setInput('');
        }
    };

    const handleRemove = (index) => {
        const updated = items.filter((_, i) => i !== index);
        setItems(updated);
    };

    return (
        <div>
            <label className="font-semibold">{label}</label>
            <div className="flex gap-2 mt-1">
                <input
                    className="p-2 border rounded w-full outline-none"
                    type="text"
                    placeholder={placeholder}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button
                    type="button"
                    onClick={handleAdd}
                    className="px-3 bg-green-500 text-white rounded"
                >
                    Add
                </button>
            </div>
            <ul className="mt-2 list-disc list-inside space-y-1">
                {items.map((item, index) => (
                    <li key={index} className="flex justify-between items-center">
                        {item}
                        <button
                            type="button"
                            onClick={() => handleRemove(index)}
                            className="text-red-500 text-sm"
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const JobPost = () => {
    const [loading, setLoading] = useState(false);
    const [requirements, setRequirements] = useState([]);
    const [responsibilities, setResponsibilities] = useState([]);
    const [skills, setSkills] = useState([]);

    const formik = useFormik({
        initialValues: {
            title: '',
            department: '',
            location: '',
            type: 'Full-time',
            experience: '',
            description: '',
            salary: '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            department: Yup.string().required('Department is required'),
            location: Yup.string().required('Location is required'),
            type: Yup.string().oneOf(['Full-time', 'Part-time']).required('Job type is required'),
            description: Yup.string().required('Description is required'),
            salary: Yup.string().required('Salary is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            setLoading(true);
            try {
                const formData = {
                    ...values,
                    requirements,
                    responsibilities,
                    skills,
                };

                await createJob(formData);
                toast.success('Job posted successfully!');
                resetForm();
                setRequirements([]);
                setResponsibilities([]);
                setSkills([]);
            } catch (err) {
                toast.error(err.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <div className='flex h-[calc(100vh-100px)] p-[10px] flex-col gap-[10px]'>
            <h1 className="text-[25px] font-bold">Post a Job</h1>
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-[20px]">

                <InputField name="title" placeholder="Job Title" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.title} touched={formik.touched.title} errors={formik.errors.title} />
                <InputField name="department" placeholder="Department" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.department} touched={formik.touched.department} errors={formik.errors.department} />
                <InputField name="experience" placeholder="Experience (e.g., 3+ years)" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.experience} />
                <InputField name="location" placeholder="Location" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.location} touched={formik.touched.location} errors={formik.errors.location} />
                <InputField name="salary" placeholder="Salary (e.g., $80,000 - $110,000)" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.salary} touched={formik.touched.salary} errors={formik.errors.salary} />

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

                <DynamicListInput label="Requirements" items={requirements} setItems={setRequirements} placeholder="Enter requirement and click Add" />
                <DynamicListInput label="Responsibilities" items={responsibilities} setItems={setResponsibilities} placeholder="Enter responsibility and click Add" />
                <DynamicListInput label="Skills" items={skills} setItems={setSkills} placeholder="Enter skill and click Add" />

                <div>
                    <Button onClick={formik.handleSubmit} isLoading={loading} text={'Post Job'} color={'white'} bg={'black'} />
                </div>
            </form>
        </div>
    );
};

export default JobPost;