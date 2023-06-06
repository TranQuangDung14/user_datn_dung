import { environment } from './../../../environments/environment.prod';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private API_URL = 'http://127.0.0.1:8000/api/';
  // public host = environment.BASE_API;

  public code_tokens = `Bearer ${localStorage.getItem('profanis_auth')}`;

  private _islog = new BehaviorSubject<boolean>(false);
  public readonly TOKEN_NAME = 'profanis_auth';
  islog = this._islog.asObservable();
  get token() {
    return localStorage.getItem(this.TOKEN_NAME)!;
  }
  constructor(private _http: HttpClient, public router: Router) {
    //
    this._islog.next(!!this.token);
  }
  // hàm kiểm tra người dùng có đăng nhập hay không!
  isLoggedIn() {
    const token = localStorage.getItem('profanis_auth');
    return token !== null;
  }
  // login(data: any): Observable<any> {
  //   return this._http.post<any>(this.API_URL + 'login', data);
  // }
  // getalluser(): Observable<any> {
  //   return this._http.get<any>(this.API_URL + 'user/', {
  //     headers: {
  //       Authorization: this.code_tokens
  //     }
  //   });
  // }

  login(data: any) {
    return this._http.post<any>(this.API_URL + 'customer-login', data).pipe(
      tap((respose: any) => {
        // console.log('vao');
        this._islog.next(true);
        localStorage.setItem(this.TOKEN_NAME, respose.access_token);
      })
    );
  }
  register(data: any): Observable<any> {
    return this._http.post<any>(this.API_URL + 'register_customer', data);
  }
  logout(): Observable<any> {
    return this._http.get<any>(this.API_URL + 'logout', {
      headers: {
        Authorization: this.code_tokens,
      },
    });
  }

//chức năng giỏ hàng
  // danh sách sản phẩm của giỏ hàng
  getallcart(): Observable<any> {
    return this._http.get<any>(this.API_URL + 'cart/', {
      headers: {
        Authorization: this.code_tokens
      }
    });
  }
  // create_cart(product_id:number, quantity:number): Observable<any> {
  //   console.log('nè nè',this.code_tokens);
  //   return this._http.post<any>(this.API_URL + 'cart-add/', {
  //     headers: {
  //       Authorization: this.code_tokens
  //       // Authorization: "15|asjPOcDUXa14BgISbNbhTR3RndukIcAwhg8c4W5x"
  //     }
  //   });
  // }
  create_cart(product_id: number, quantity: number): Observable<any> {
    const headers = { Authorization: this.code_tokens };
    const body = { product_id, quantity};
    return this._http.post<any>(this.API_URL + 'cart-add/', body, { headers });
  }


  update_quantity_cart(product_id: number, quantity: number): Observable<any> {
    const headers = { Authorization: this.code_tokens };
    const body = { quantity };
    return this._http.put<any>(this.API_URL + 'cart-update/' + product_id, body, { headers });
  }

  delete_product_cart(productId: number): Observable<any> {
    const headers = { Authorization: this.code_tokens };
    return this._http.delete<any>(this.API_URL + 'cart-remove/' + productId, { headers });
  }

  apply_voucher(voucherCode: string): Observable<any> {
    const headers = { Authorization: this.code_tokens };
    const body = { voucher_code: voucherCode };
    return this._http.post<any>(this.API_URL + 'apply-voucher', body, { headers });
  }

  // đơn hàng thanh toán
  create_order(data: any): Observable<any> {
    const headers = { Authorization: this.code_tokens };
    // const body = { product_id, quantity };
    return this._http.post<any>(this.API_URL + 'payment-order/', data, { headers });
  }


  // Route::put('/cart-update/{cartDetail}', [CartController::class, 'updateQuantity']);
  // Route::delete('/cart-remove/{cartDetail}', [CartController::class, 'removeProduct']);
  // Route::post('/apply-voucher', [CartController::class, 'applyVoucher']);


  getalluser(): Observable<any> {
    return this._http.get<any>(this.API_URL + 'user/', {
      headers: {
        Authorization: this.code_tokens
      }
    });
  }
  //order đơn hàng theo tài khoản
  get_order_customer(status: number): Observable<any> {
    return this._http.get<any>(this.API_URL + 'order_customer/' + status, {
      headers: {
        Authorization: this.code_tokens
      }
    });
  }
  // chi tiết đơn hàng
  get_order_id(id: number): Observable<any> {
    return this._http.get<any>(this.API_URL + 'order_customer_detail/' + id, {
      headers: {
        Authorization: this.code_tokens,
      },
    });
  }
  update_order_status(id: number, status: number): Observable<any> {
    const body = { status: status };
    return this._http.put<any>(this.API_URL + 'update_status_order_customer/' + id, body, {
      headers: {
        Authorization: this.code_tokens,
      },
    });
  }
  //     // đơn giao thành công
  // get_order_success(): Observable<any> {
  //   return this._http.get<any>(this.API_URL + 'order_customer_success/', {
  //     headers: {
  //       Authorization: this.code_tokens,
  //     },
  //   });
  // }

  // // đơn hủy
  // get_order_cancel(): Observable<any> {
  //   return this._http.get<any>(this.API_URL + 'order_customer_cancel/', {
  //     headers: {
  //       Authorization: this.code_tokens,
  //     },
  //   });
  // }

  // create_order(data:any): Observable<any> {
  //   return this._http.post<any>(this.API_URL + 'order/',data, {
  //     headers: {
  //       Authorization: this.code_tokens
  //     }
  //   })
  // }
  get_order(id: number): Observable<any> {
    return this._http.get<any>(this.API_URL + 'order/' + id, {
      headers: {
        Authorization: this.code_tokens
      }
    })
  }
  update_order(id: number, data: any): Observable<any> {
    return this._http.put<any>(this.API_URL + 'order/' + id, data, {
      headers: {
        Authorization: this.code_tokens
      }
    });
  }
  delete_order(id: number): Observable<any> {
    return this._http.delete<any>(this.API_URL + 'order/' + id
      ,
      {
        headers: {
          Authorization: this.code_tokens
        }
      }
    );
  }


  //product
  get_all_product(): Observable<any> {
    return this._http.get<any>(this.API_URL + 'product/', {
      headers: {
        Authorization: this.code_tokens
      }
    });
  }
  //them sản phẩm
  create_product(data: any): Observable<any> {
    return this._http.post<any>(this.API_URL + 'product/', data, {
      headers: {
        Authorization: this.code_tokens
      }
    })
  }
  get_product(id: number): Observable<any> {
    return this._http.get<any>(this.API_URL + 'products/' + id
      // , {
      //   headers: {
      //     Authorization: this.code_tokens
      //   },
      // }
    )
  }
  // Front end (user)
  get_index_product(): Observable<any> {
    return this._http.get<any>(this.API_URL + 'get_product/', {
      // headers: {
      //   Authorization: this.code_tokens
      // },
    }
    )
  };
  //detail dữ liệu theo id
  get_detail(id: number): Observable<any> {
    return this._http.get<any>(this.API_URL + 'get_product/' + id
      // , {
      //   headers: {
      //     Authorization: this.code_tokens
      //   },
      // }
      );
  }
  // get video user
  get_index_video(): Observable<any> {
    return this._http.get<any>(this.API_URL + 'get_video/'
      , {
        headers: {
          Authorization: this.code_tokens
        },
      })
  };

  // get posts user
  get_index_posts(): Observable<any> {
    return this._http.get<any>(this.API_URL + 'get_posts/'
      , {
        headers: {
          Authorization: this.code_tokens
        },
      }
    )
  };


  // detail posts user
  get_detail_posts(id: number): Observable<any> {
    return this._http.get<any>(this.API_URL + 'get_posts/' + id
      , {
        headers: {
          Authorization: this.code_tokens
        },
      });
  }

  get_product_by_cate(category: number): Observable<any> {
    return this._http.get<any>(this.API_URL + 'get_product_by_category?category=' + category
      , {
        headers: {
          Authorization: this.code_tokens
        },
      });
  }

  //banner
  get_banner(): Observable<any> {
    return this._http.get<any>(this.API_URL + 'banner-slide/');
  }
  //filter
  get_filter_products(category_id?: number, min_price?: number, max_price?: number,brand_id?:number): Observable<any> {
    let params = new HttpParams();

    if (category_id) {
      params = params.set('category_id', category_id.toString());
    }
    if (brand_id) {
      params = params.set('brand_id', brand_id.toString());
    }
    if (min_price) {
      params = params.set('min_price', min_price.toString());
    }
    if (max_price) {
      params = params.set('max_price', max_price.toString());
    }

    return this._http.get<any>(this.API_URL + 'filter_products/', { params });
  }
  //thông tin liên hệ
  get_store_information(): Observable<any> {
    return this._http.get<any>(this.API_URL + 'store_information_customer/'
      , {
        headers: {
          Authorization: this.code_tokens
        },
      }
    )
  };
  // getProvinces() {
  //   return this._http.get<any>(this.API_URL+'provinces`)
  // };
  // địa chỉ
  // tỉnh
  getProvinces(): Observable<any> {
    return this._http.get<any>(this.API_URL + 'provinces/');
  }
  // Huyện
  getDistricts(provinceId: number): Observable<any> {
    return this._http.get<any>(this.API_URL + 'districts/'+provinceId);
  }
  // xã
  getWards(districtId: number): Observable<any> {
    return this._http.get<any>(this.API_URL + 'wards/'+districtId);
  }
  // getDistricts(provinceId: number) {
  //   return this.http.get(`${this.apiUrl}/districts/${provinceId}`);
  // }

  // getWards(districtId: number) {
  //   return this.http.get(`${this.apiUrl}/wards/${districtId}`);
  // }
}
