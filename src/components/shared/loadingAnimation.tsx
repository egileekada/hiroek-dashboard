
import { Spinner, Text } from '@radix-ui/themes'
import React, { useEffect, useState } from 'react'

interface Props {
    loading: boolean,
    refeching?: boolean,
    children: React.ReactNode,
    length?: number,
    customLoader?: React.ReactNode,
}

function LoadingAnimation(props: Props) {

    let {
        children,
        loading,
        length,
        refeching,
        customLoader,
    } = props

    const [isLoading, setLoading] = useState(true)

    useEffect(() => { 
        // Set a 3-second timeout
        const timeoutId = setTimeout(() => { 
            setLoading(false);
        }, 2000);

        // Cleanup: clear the timeout if the component unmounts or a new timer is set
        return () => clearTimeout(timeoutId);
    }, [])

    return (
        <div className=' w-full bg-white ' >
            {(!loading && !isLoading) && (
                <div className=' w-full ' >
                    {children}
                    {((!loading && !isLoading) && refeching) && (
                        <div className=' w-full  flex ' >
                            <div className=' w-full flex justify-center text-lg ' >
                                <Spinner size={"3"} className=' !text-primary ' />
                            </div>
                        </div>
                    )}
                </div>
            )}

            {((!loading && !isLoading) && !refeching) && (
                <>
                    {length === 0 && (
                        <div className=' w-full  flex justify-center text-lg py-4 '  >
                            <Text>No Records Found</Text>
                        </div>
                    )}
                </>
            )}
            {(loading || isLoading) && (
                <div className=' w-full flex ' >
                    {!customLoader && (
                        <div className=' w-full flex justify-center  py-4 text-lg ' >
                            <Spinner size={"3"} className=' !text-primary ' />
                        </div>
                    )}
                    {customLoader}
                </div>
            )}
        </div>
    )
}

export default LoadingAnimation
