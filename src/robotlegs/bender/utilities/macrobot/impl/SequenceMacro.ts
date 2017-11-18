// ------------------------------------------------------------------------------
//  2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IMacro } from "../api/IMacro";
import { ISubCommandMapping } from "../api/ISubCommandMapping";

import { AbstractMacro } from "./AbstractMacro";

export abstract class SequenceMacro extends AbstractMacro implements IMacro {
    private _executionIndex: number;

    private _success: boolean;
    private _running: boolean;

    private _commands: ISubCommandMapping[];

    private _atomic: boolean;
    private _customAtomic: boolean;

    public get atomic(): boolean {
        return this._customAtomic !== undefined ? this._customAtomic : true;
    }

    public set atomic(value: boolean) {
        if (!this._running) {
            this._customAtomic = value;
        }
    }

    public execute(): void {
        this._atomic = this.atomic;
        this._success = true;
        this._running = true;
        this._executionIndex = 0;
        this._commands = this._mappings.getList();
        this.executeNext();
    }

    protected executeNext(): void {
        if (this.hasCommands) {
            let mapping: ISubCommandMapping = this._commands[
                this._executionIndex++
            ];
            this.executeCommand(mapping);
        } else {
            this.dispatchComplete(this._success);
        }
    }

    private get hasCommands(): boolean {
        return this._commands && this._executionIndex < this._commands.length;
    }

    protected commandCompleteHandler(success: boolean): void {
        this._success = this._success && success;

        if (this._atomic || this._success) {
            this.executeNext();
        } else {
            this.dispatchComplete(false);
        }
    }

    protected dispatchComplete(success: boolean): void {
        this._running = false;
        this._success = true;
        this._executionIndex = 0;
        this._commands = null;

        super.dispatchComplete(success);
    }
}
