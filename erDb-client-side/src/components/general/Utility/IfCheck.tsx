import React from "react";

interface IfCheckProps {
    condition: boolean;
    success: React.ReactElement;
    fail?: React.ReactElement | null;
}

function IfCheck({
    condition, success, fail = null
}: IfCheckProps) {
    if(condition) return success;
    else return fail;
}

export default IfCheck