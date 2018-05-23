// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable } from "inversify";

import { ParallelMacro } from "../../../../../../src/robotlegs/bender/utilities/macrobot/impl/ParallelMacro";

import { ReportDelayAsyncCommand } from "./ReportDelayAsyncCommand";
import { Report1Command } from "./Report1Command";
import { Report2Command } from "./Report2Command";
import { Report3Command } from "./Report3Command";

@injectable()
export class TestAddAndRemoveParallelCommand extends ParallelMacro {
    public prepare(): void {
        this.add(ReportDelayAsyncCommand).withPayloads("Command 1", 100);
        this.add(ReportDelayAsyncCommand).withPayloads("Command 2", 75);
        this.add(ReportDelayAsyncCommand).withPayloads("Command 3", 50);

        this.add(Report1Command);
        this.add(Report2Command);
        this.add(Report3Command);

        this.remove(Report2Command);
        this.remove(Report3Command);
    }
}
