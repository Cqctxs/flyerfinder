import FlyerSquareOne from "@/public/components/flyer-square-one";

export default function test(){
    return (
        // use grid instead of flex!
         <div className="flex justify-between">
            <FlyerSquareOne/>
            <FlyerSquareOne/>
            <FlyerSquareOne/>
            <FlyerSquareOne/>
        </div>
    );
}