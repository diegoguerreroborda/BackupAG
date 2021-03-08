#!/bin/bash
watch -n 5 "(date '+DATE:%H:%M:%S'; curl localhost:4320/students_backup; echo '';) >> log.log"