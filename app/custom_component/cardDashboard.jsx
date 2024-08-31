import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { FileVideo, FileCheckIcon, FileWarning, FileX } from "lucide-react";

export default function CardDashboard(props) {

    function renderIcon(){
        switch(props.status){
            case "emcontratacao":
                return <FileVideo className="size-16 text-slate-800" />;
            case "concluido":
                return <FileCheckIcon className="size-16 text-slate-800"/>;
            case "paralisado":
                return <FileWarning className="size-16 text-slate-800" />;
            case "cancelado":
                return <FileX className="size-16 text-slate-800" />;
            default:
                return <></>
        }
    }


  return (
    <Card className="border-8 border-slate-700 rounded-3xl">
      <CardHeader className="flex flex-row items-center pl-14">
        {renderIcon()}
        <CardTitle>{props.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="flex justify-center font-bold text-6xl">{props.content}</p>
      </CardContent>
    </Card>
  );
}
