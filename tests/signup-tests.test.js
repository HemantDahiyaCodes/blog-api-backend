import {expect, test} from "vitest";
import * as request from supertest;
import express from "express";

// routes and app imports
import { signUp } from "../routes/sign-up";
const app = express();
