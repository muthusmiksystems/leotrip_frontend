import { Googlesignin, PrimaryButton } from "styles/Button";
import { IndicateSlider } from "components/common/IndicateSlider";
import { AuthForm } from "./AuthForm";
import { AuthLogin } from "./AuthLogin";
import { useEffect, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import useHTTPService from "components/utils/http";
import jwtDecode from "jwt-decode";
import { generateUUID } from "components/utils/GenerateId";
import offer from '../../assets/images/offer.png';


interface AuthContainerProps {
    proceed: (isLogin: boolean, UserorEmail: string, isPassword?: boolean | undefined, OTPProps?: any) => void;
    close: () => void;

}
function AuthContainer({ close, proceed }: AuthContainerProps) {
    const http = useHTTPService();
    const OAuthSignIn = async (credentialResponse: any) => {
        console.log("credentialResponse", credentialResponse.credential, jwtDecode(credentialResponse.credential));
        const Id = generateUUID();
        const result = await http.post('user/create', { token: credentialResponse.credential, deviceId: Id.uuid });
        console.log("result", result)
        close()
    }
    return (
        <div className="flex w-full h-[550px] bg-white border-8 border-gray-400">


            <div className="w-[45%] h-[100%]  rounded-l-2xl my-0"  >
                {/* <IndicateSlider /> */}
                <img src={offer} alt="offer" className="w-[100%] h-[100%]"/>
            </div>
            <div className="w-[55%] h-[93%] flex items-center justify-between flex-col bg-white  mt-5">
                <div className="justify-content w-full mt-[5%] ">
                    <div className="mb-1 relative items-center w-[80%] mx-[10%]">
                        <div className=" mb-[10%] mt-[2%] text-5xl font-family['Poppins', sans]  font-medium text-center">Login</div>
                        <AuthForm proceed={proceed} />
                        <div className="flex items-center justify-center relative my-8">
                            <hr className="border-g flex-grow" />
                            <span className="bg-white px-2 text-gray-500">or</span>
                            <hr className="border-gray-400 flex-grow" />
                        </div>
                        <div className="bg-blue-500 flex text-white w-[70%] mx-16 rounded-lg">
                        <div className=" w-[20%] mx-[2%]  p-2">
                            <GoogleOAuthProvider clientId='309517142982-tvs9ff5g07bjhijg7m1fegvhfjeh6orc.apps.googleusercontent.com'>
                                <GoogleLogin
                                    onSuccess={credentialResponse => {
                                        OAuthSignIn(credentialResponse)
                                    }}
                                    onError={() => {
                                        console.log('Login Failed');
                                    }}

                                    theme="outline"
                                    text="continue_with"
                                    logo_alignment="center"
                                    shape="circle"
                                    type="icon"

                                />
                            </GoogleOAuthProvider>
                        </div>
                        <div className="pt-3 text-lg">sign in with google</div>
                        </div>
                        
                    </div>
                </div>
                <div className="text-xs mb-2">
                    By Signing up, I agree to the{" "}
                    {/* <a href="#" className="text-blue-500 hover:underline">
                        Privacy Policy
                    </a>
                    ,{" "}
                    <a href="#" className="text-blue-500 hover:underline">
                        User Agreement
                    </a>
                    , and{" "} */}
                    <a href="#" className="text-blue-500 hover:underline">
                    Terms & Conditions.
                    </a>
                </div>
            </div>
        </div>
    );
}

export default AuthContainer;
