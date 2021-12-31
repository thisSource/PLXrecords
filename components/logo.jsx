import Image from "next/image";
import Link from "next/link";
import Router from 'next/router'


function Logo() {

  return (
    <div className="flex flex-row items-center justify-evenly mt-4">
      <div>
        {/* <Link href="/"> */}
          <a className="mt-5 mb-3 ml-4 cursor-pointer" onClick={() => window.location.href = "/"}>
            <Image
              src={"/logos/recordshuvud.png"}
              width="70"
              height="85"
              alt="logo"
            />
          </a>
      </div>
    </div>
  );
}

export default Logo;
