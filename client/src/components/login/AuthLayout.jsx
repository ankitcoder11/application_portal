const AuthLayout = ({ children }) => {
    return (
        <div className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-[#9FFFB5] to-[#00A56D] font-robot">
            <div className="w-[70%] max-[800px]:w-[90%] h-[85%] max-[800px]:h-[90%] bg-[#F3F3F3] flex p-[40px] max-[800px]:p-[15px] justify-between rounded-md">
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
