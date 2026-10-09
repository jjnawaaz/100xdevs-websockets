type ApiResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

// function unwrap<T>(result: ApiResult<T>): T | string {
//   if (result.success) {
//     return result.data;
//   } else {
//     return result.error;
//   }
// }

// better way
function unwrap<T>(result: ApiResult<T>): T {
  if (result.success) {
    return result.data;
  }
  throw new Error(result.error);
}
