const AuthLayout = ({ children }) => {
    return (
        <div className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-[#9FFFB5] to-[#00A56D] font-robot">
            <div className="w-[70%] h-[85%] bg-[#F3F3F3] flex p-[40px] justify-between rounded-md">
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
