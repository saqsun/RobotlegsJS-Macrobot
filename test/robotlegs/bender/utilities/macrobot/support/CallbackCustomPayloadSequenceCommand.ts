// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { inject, injectable } from "@robotlegsjs/core";

import { SequenceMacro } from "../../../../../../src/robotlegs/bender/utilities/macrobot/impl/SequenceMacro";

import { CallbackCustomPayloadCommand } from "./CallbackCustomPayloadCommand";

@injectable()
export class CallbackCustomPayloadSequenceCommand extends SequenceMacro {
    @inject(String)
    public stringValue: string;

    public prepare(): void {
        this.add(CallbackCustomPayloadCommand);
    }
}