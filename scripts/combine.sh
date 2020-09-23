#!/bin/bash

path=$(pwd)
for year_dir in all/*
do
    cd $year_dir
    year=$(basename $year_dir)
    yearfile=$path/allcombined/$year
    touch $yearfile
    for compress_file in $(ls)
    do
        gunzip -c $compress_file >> $yearfile
        echo $compress_file
    done
    cd ../..
done
