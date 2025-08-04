import { FaArrowRightLong, FaLightbulb, FaUsers } from "react-icons/fa6";
import { GiScales } from "react-icons/gi";
import { RiTrophyFill } from "react-icons/ri";
import people from '/about.jpg'

const About = () => {
    const culturePoints = [
        {
            icon: <FaUsers />,
            title: 'Collaborative Environment',
            description: 'Work alongside brilliant minds in cross-functional teams that value every voice and perspective.'
        },
        {
            icon: <FaLightbulb />,
            title: 'Innovation First',
            description: 'We encourage creative thinking and provide resources to turn your innovative ideas into reality.'
        },
        {
            icon: <GiScales />,
            title: 'Work-Life Balance',
            description: 'Flexible schedules, remote work options, and unlimited PTO to help you thrive both personally and professionally.'
        },
        {
            icon: <RiTrophyFill />,
            title: 'Growth Opportunities',
            description: 'Continuous learning programs, mentorship, and clear career advancement paths for every team member.'
        }
    ];

    return (
        <section className="relative h-[calc(100vh-100px)] bg-[#00F295] overflow-auto p-2">
            <div className="flex gap-5 flex-col">
                <div className="text-center flex flex-col gap-2">
                    <h2 className="text-4xl font-bold text-gray-900">Why Work With Us</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Our culture is built on trust, innovation, and mutual respect. We believe that great work comes from great people in a supportive environment.
                    </p>
                </div>

                <div className="flex gap-4 flex-wrap">
                    {culturePoints.map((point, index) => (
                        <div key={index} className="bg-white rounded-md p-6 shadow-lg hover:shadow-xl transition-shadow w-[32%] max-w-xs flex flex-col gap-3 ">
                            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
                                <div className='text-2xl text-green-600'>{point.icon}</div>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">{point.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{point.description}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-md p-10 shadow-xl">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Values in Action</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <FaArrowRightLong />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Diversity & Inclusion</h4>
                                        <p className="text-gray-600">We celebrate diverse backgrounds and ensure everyone feels valued and heard.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <FaArrowRightLong />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Continuous Learning</h4>
                                        <p className="text-gray-600">$5,000 annual learning budget and access to top industry conferences and courses.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <FaArrowRightLong />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Impact-Driven Work</h4>
                                        <p className="text-gray-600">Every role contributes to meaningful projects that make a difference in people's lives.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <img src={people} alt="Team Culture"
                                className="rounded-2xl shadow-lg object-cover w-full h-80"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About